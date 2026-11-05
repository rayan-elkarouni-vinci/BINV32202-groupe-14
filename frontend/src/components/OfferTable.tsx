import type { Offer } from "../models/offer.ts";
import { useState } from "react";
import type { Application, ApplicationStatus } from "../models/application.ts";
import type { User } from "../models/user.ts";
import { createApplication } from "../services/applications.service.ts";
import { isUnauthorized } from "../utils/api.ts";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_TONES,
  OFFER_STATUS_LABELS,
  OFFER_STATUS_TONES,
  PERIOD_LABELS,
} from "../utils/labels.ts";
import StatusBadge from "./StatusBadge.tsx";

interface OfferTableProps {
  offers: Offer[];
  user: User;
  token: string;
  onUnauthorized: () => void;
  applicationStatuses?: Partial<Record<number, ApplicationStatus>>;
  onApplicationSubmitted?: (application: Application) => void;
}

const OfferTable = ({
  offers,
  user,
  token,
  onUnauthorized,
  applicationStatuses = {},
  onApplicationSubmitted,
}: OfferTableProps) => {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [submittingOfferId, setSubmittingOfferId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async (offerId: number) => {
    try {
      setError(null);
      setSubmittingOfferId(offerId);
      const application = await createApplication(token, offerId, message);
      onApplicationSubmitted?.(application);
      setActiveOfferId(null);
      setMessage("");
    } catch (reason: unknown) {
      if (isUnauthorized(reason)) onUnauthorized();
      else if (reason instanceof Error) {
        setError(
          reason.message.includes("409")
            ? "Vous avez déjà candidaté à cette offre."
            : reason.message,
        );
      } else setError("Candidature impossible");
    } finally {
      setSubmittingOfferId(null);
    }
  };

  return (
  <div className="table-wrapper">
    {error && <p className="state state-error" role="alert">{error}</p>}
    <table className="data-table">
      <thead>
        <tr>
          <th scope="col">Titre</th>
          <th scope="col">Entreprise</th>
          <th scope="col">Année</th>
          <th scope="col">Période</th>
          <th scope="col">Statut</th>
          {user.kind === "STUDENT" && <th scope="col">Candidature</th>}
        </tr>
      </thead>
      <tbody>
        {offers.map((offer) => (
          <tr key={offer.id}>
            <td>{offer.title}</td>
            <td>{offer.companyShortName}</td>
            <td>{offer.academicYear}</td>
            <td>{PERIOD_LABELS[offer.period]}</td>
            <td>
              <StatusBadge
                label={OFFER_STATUS_LABELS[offer.status]}
                tone={OFFER_STATUS_TONES[offer.status]}
              />
            </td>
            {user.kind === "STUDENT" && (
              <td>
                {applicationStatuses[offer.id] ? (
                  <StatusBadge
                    label={APPLICATION_STATUS_LABELS[applicationStatuses[offer.id]!]}
                    tone={APPLICATION_STATUS_TONES[applicationStatuses[offer.id]!]}
                  />
                ) : activeOfferId === offer.id ? (
                  <form onSubmit={(event) => { event.preventDefault(); void submitApplication(offer.id); }}>
                    <label>
                      <span>Message (facultatif)</span>
                      <textarea
                        aria-label={`Message pour ${offer.title}`}
                        maxLength={1000}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                      />
                    </label>
                    <button type="submit" disabled={submittingOfferId === offer.id}>
                      {submittingOfferId === offer.id ? "Envoi…" : "Envoyer"}
                    </button>
                    <button type="button" onClick={() => { setActiveOfferId(null); setMessage(""); }}>
                      Annuler
                    </button>
                  </form>
                ) : (
                  <button type="button" onClick={() => { setActiveOfferId(offer.id); setError(null); }}>
                    Candidater
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default OfferTable;
