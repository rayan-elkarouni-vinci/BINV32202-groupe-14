import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { APPLICATION, OFFER, STUDENT } from "../src/db/seed/seedIds.ts";
import { createTestApp, tokenFor } from "./helpers/testApp.ts";
import { createTestDatabase } from "./helpers/testDatabase.ts";

let app: ReturnType<typeof createTestApp>;

beforeEach(() => {
  app = createTestApp();
});

const applyAs = (kind: "ADMIN" | "CONTACT" | "STUDENT", id: number, offerId: number, body?: object) => {
  const requestBuilder = request(app)
    .post(`/offers/${offerId}/applications`)
    .set("Authorization", tokenFor(kind, id));
  return body === undefined ? requestBuilder : requestBuilder.send(body);
};

describe("POST /offers/:offerId/applications", () => {
  it("crée une candidature avec un message facultatif", async () => {
    const response = await applyAs("STUDENT", STUDENT.DMYTRO_KOVALENKO, OFFER.FLEET_APP, {
      message: "Je suis très motivé.",
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      offerId: OFFER.FLEET_APP,
      message: "Je suis très motivé.",
      status: "IN_PROGRESS",
    });
  });

  describe("GET /applications", () => {
    it("retourne toutes les candidatures de l'étudiant, y compris retirées", async () => {
      const response = await request(app)
        .get("/applications")
        .set("Authorization", tokenFor("STUDENT", STUDENT.INES_HADDAD));

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: APPLICATION.INES_FLEET_APP,
          status: "IN_PROGRESS",
        }),
        expect.objectContaining({
          id: APPLICATION.INES_BILLING_API,
          status: "WITHDRAWN",
        }),
      ]));
    });

    it("retourne aussi une candidature liée à une offre archivée", async () => {
      const db = createTestDatabase();
      db.prepare(`
        INSERT INTO applications (offer_id, student_id, message, status)
        VALUES (?, ?, ?, ?)
      `).run(OFFER.PDF_REPORTS, STUDENT.DMYTRO_KOVALENKO, null, "IN_PROGRESS");
      const archivedApp = createTestApp(db);

      const response = await request(archivedApp)
        .get("/applications")
        .set("Authorization", tokenFor("STUDENT", STUDENT.DMYTRO_KOVALENKO));

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        expect.objectContaining({
          offerId: OFFER.PDF_REPORTS,
          offerStatus: "ARCHIVED",
        }),
      ]);
    });

    it.each([
      ["ADMIN", 1],
      ["CONTACT", 1],
    ] as const)("refuse le profil %s", async (kind, id) => {
      const response = await request(app)
        .get("/applications")
        .set("Authorization", tokenFor(kind, id));

      expect(response.status).toBe(403);
      expect(response.body.error.code).toBe("FORBIDDEN");
    });
  });

  it("refuse les profils qui ne sont pas étudiants", async () => {
    const response = await applyAs("ADMIN", 1, OFFER.FLEET_APP);

    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe("FORBIDDEN");
  });

  it("refuse une offre qui n'est pas publiée", async () => {
    const response = await applyAs("STUDENT", STUDENT.DMYTRO_KOVALENKO, OFFER.CLIENT_PORTAL);

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("OFFER_NOT_PUBLISHED");
  });

  it("refuse un message de plus de 1000 caractères", async () => {
    const response = await applyAs("STUDENT", STUDENT.DMYTRO_KOVALENKO, OFFER.FLEET_APP, {
      message: "x".repeat(1001),
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_MESSAGE");
  });

  it("refuse une candidature active existante", async () => {
    const response = await applyAs("STUDENT", STUDENT.LUCAS_DUPONT, OFFER.FLEET_APP);

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("APPLICATION_EXISTS");
  });

  it("réactive une candidature retirée sans créer de doublon", async () => {
    const response = await applyAs("STUDENT", STUDENT.INES_HADDAD, OFFER.BILLING_API, {
      message: "Nouvelle motivation",
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: APPLICATION.INES_BILLING_API,
      message: "Nouvelle motivation",
      status: "IN_PROGRESS",
    });
  });

  it("refuse un identifiant d'offre invalide", async () => {
    const response = await applyAs("STUDENT", STUDENT.DMYTRO_KOVALENKO, 0);

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_OFFER_ID");
  });
});
