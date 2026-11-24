import { expect, test, type Page } from "@playwright/test";

const publishedApplicationOffer = "Application React de gestion de flotte";
const assignedApplicationOffer = "Migration d'une application vers le cloud";

const openOffersAsLucas = async (page: Page) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Connexion de démonstration" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Étudiants" })).toBeVisible();
  await page.getByRole("button", { name: "Lucas Dupont", exact: true }).click();
  await page.getByRole("link", { name: "Offres", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Offres de stage" })).toBeVisible();
  await expect(page.getByRole("cell").first()).toBeVisible();
};

test("Scénario 1 — recherche avec résultat et vérification de la visibilité", async ({ page }) => {
  await openOffersAsLucas(page);

  await page.getByRole("searchbox", { name: "Recherche par titre" }).fill("application");

  const offerTables = page.getByRole("table");
  await expect(offerTables).toHaveCount(1);
  await expect(offerTables.getByRole("row")).toHaveCount(2);

  const appliedOffersSection = page
    .getByRole("heading", { name: "Offres déjà candidatées" })
    .locator("..");
  await expect(
    appliedOffersSection.getByRole("cell", { name: publishedApplicationOffer, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: assignedApplicationOffer, exact: true }),
  ).toHaveCount(0);
});

test("Scénario 2 — recherche sans résultat", async ({ page }) => {
  await openOffersAsLucas(page);

  await page.getByRole("searchbox", { name: "Recherche par titre" }).fill("zzz-inexistant");

  await expect(page.getByRole("table")).toHaveCount(0);
  await expect(page.getByRole("cell")).toHaveCount(0);
  await expect(
    page.getByText("Aucune offre ne correspond à votre recherche.", { exact: true }),
  ).toBeVisible();
});
