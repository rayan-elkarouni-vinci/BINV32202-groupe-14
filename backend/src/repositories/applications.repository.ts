import type { Db } from "../db/database.ts";
import type { ApplicationDbo } from "../models/application.ts";

interface ApplicationKey {
  offerId: number;
  studentId: number;
}

interface ApplicationValues extends ApplicationKey {
  message: string | null;
}

export const createApplicationsRepository = (db: Db) => {
  const findOfferStatus = db.prepare<{ offerId: number }, { status: string }>(
    "SELECT status FROM offers WHERE id = @offerId",
  );
  const findExisting = db.prepare<ApplicationKey, ApplicationDbo>(`
    SELECT id, offer_id, student_id, message, status, applied_at
    FROM applications
    WHERE offer_id = @offerId AND student_id = @studentId
  `);
  const insert = db.prepare<ApplicationValues>(`
    INSERT INTO applications (offer_id, student_id, message)
    VALUES (@offerId, @studentId, @message)
  `);
  const reactivate = db.prepare<ApplicationValues>(`
    UPDATE applications
    SET message = @message, status = 'IN_PROGRESS', applied_at = datetime('now')
    WHERE offer_id = @offerId AND student_id = @studentId AND status = 'WITHDRAWN'
  `);

  const createOrReactivate = db.transaction((values: ApplicationValues) => {
    const offer = findOfferStatus.get({ offerId: values.offerId });
    if (offer === undefined) {
      throw new Error("Offer must be checked before creating an application");
    }

    const existing = findExisting.get(values);
    if (existing?.status === "WITHDRAWN") {
      reactivate.run(values);
      return { application: findExisting.get(values) as ApplicationDbo, exists: false };
    }
    if (existing !== undefined) {
      return { application: existing, exists: true };
    }

    insert.run(values);
    return { application: findExisting.get(values) as ApplicationDbo, exists: false };
  });

  return {
    findOfferStatus: (offerId: number): string | undefined =>
      findOfferStatus.get({ offerId })?.status,
    findByOfferAndStudent: (offerId: number, studentId: number): ApplicationDbo | undefined =>
      findExisting.get({ offerId, studentId }),
    createOrReactivate,
  };
};

export type ApplicationsRepository = ReturnType<typeof createApplicationsRepository>;
