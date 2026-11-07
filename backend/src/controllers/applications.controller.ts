import { Router } from "express";
import { toApplicationDto } from "../mappers/application.mapper.ts";
import { getCurrentUser } from "../middlewares/authenticate.ts";
import type { ApplicationsService } from "../services/applications.service.ts";
import { HttpError } from "../utils/httpError.ts";

const parseOfferId = (value: string): number => {
  const offerId = Number(value);
  if (!Number.isSafeInteger(offerId) || offerId <= 0) {
    throw new HttpError(400, "INVALID_OFFER_ID", "L'identifiant de l'offre est invalide");
  }
  return offerId;
};

const parseApplicationId = (value: string): number => {
  const applicationId = Number(value);
  if (!Number.isSafeInteger(applicationId) || applicationId <= 0) {
    throw new HttpError(400, "INVALID_APPLICATION_ID", "L'identifiant de la candidature est invalide");
  }
  return applicationId;
};

const parseMessage = (body: unknown): string | null => {
  if (body === undefined) return null;
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new HttpError(400, "INVALID_BODY", "Le corps doit être un objet JSON");
  }
  const message = (body as Record<string, unknown>).message;
  if (message === undefined || message === null || message === "") return null;
  if (typeof message !== "string") {
    throw new HttpError(400, "INVALID_MESSAGE", "Le message doit être une chaîne de caractères");
  }
  return message.trim() === "" ? null : message.trim();
};

export const createApplicationsRouter = (service: ApplicationsService) => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json(service.listOwn(getCurrentUser(req)).map(toApplicationDto));
  });

  router.post("/:applicationId/withdraw", (req, res) => {
    const application = service.withdraw(
      getCurrentUser(req),
      parseApplicationId(req.params.applicationId),
    );
    res.json(toApplicationDto(application));
  });

  return router;
};

export const createOfferApplicationsRouter = (service: ApplicationsService) => {
  const router = Router();

  router.post("/:offerId/applications", (req, res) => {
    const application = service.apply(
      getCurrentUser(req),
      parseOfferId(req.params.offerId),
      parseMessage(req.body),
    );
    res.status(201).json(toApplicationDto(application));
  });

  return router;
};
