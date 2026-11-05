import { toApplication } from "../mappers/application.mapper.ts";
import type { Application } from "../models/application.ts";
import type { User } from "../models/user.ts";
import type { ApplicationsRepository } from "../repositories/applications.repository.ts";
import { HttpError } from "../utils/httpError.ts";
import { isStudent } from "./permissions.ts";

const MAX_MESSAGE_LENGTH = 1000;

export const createApplicationsService = (repository: ApplicationsRepository) => ({
  listOwn: (viewer: User): Application[] => {
    if (!isStudent(viewer)) {
      throw new HttpError(403, "FORBIDDEN", "Seul un étudiant peut consulter ses candidatures");
    }
    return repository.findByStudent(viewer.id).map(toApplication);
  },

  apply: (viewer: User, offerId: number, message: string | null): Application => {
    if (!isStudent(viewer)) {
      throw new HttpError(403, "FORBIDDEN", "Seul un étudiant peut candidater");
    }

    if (message !== null && message.length > MAX_MESSAGE_LENGTH) {
      throw new HttpError(
        400,
        "INVALID_MESSAGE",
        `Le message ne peut pas dépasser ${MAX_MESSAGE_LENGTH} caractères`,
      );
    }

    const offerStatus = repository.findOfferStatus(offerId);
    if (offerStatus === undefined) {
      throw new HttpError(404, "OFFER_NOT_FOUND", "Offre introuvable");
    }
    if (offerStatus !== "PUBLISHED") {
      throw new HttpError(409, "OFFER_NOT_PUBLISHED", "L'offre n'est pas publiée");
    }

    const result = repository.createOrReactivate({
      offerId,
      studentId: viewer.id,
      message,
    });
    if (result.exists) {
      throw new HttpError(409, "APPLICATION_EXISTS", "Vous avez déjà candidaté à cette offre");
    }

    return toApplication(result.application);
  },
});

export type ApplicationsService = ReturnType<typeof createApplicationsService>;
