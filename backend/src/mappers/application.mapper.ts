import type { Application, ApplicationDbo, ApplicationDto } from "../models/application.ts";

export const toApplication = (dbo: ApplicationDbo): Application => ({
  id: dbo.id,
  offerId: dbo.offer_id,
  message: dbo.message,
  status: dbo.status,
});

export const toApplicationDto = (application: Application): ApplicationDto => application;
