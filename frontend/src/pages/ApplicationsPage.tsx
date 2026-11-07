import { useState } from "react";
import EmptyState from "../components/EmptyState.tsx";
import ErrorState from "../components/ErrorState.tsx";
import LoadingState from "../components/LoadingState.tsx";
import StatusBadge from "../components/StatusBadge.tsx";
import { useApplications } from "../hooks/useApplications.ts";
import { withdrawApplication } from "../services/applications.service.ts";
import { isUnauthorized } from "../utils/api.ts";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_TONES,
  OFFER_STATUS_LABELS,
  PERIOD_LABELS,
} from "../utils/labels.ts";

interface ApplicationsPageProps {
  token: string;
  onUnauthorized: () => void;
}

const ApplicationsPage = ({ token, onUnauthorized }: ApplicationsPageProps) => {
  const loaded = useApplications(token, onUnauthorized);
  const [withdrawnIds, setWithdrawnIds] = useState<number[]>([]);
  const [actionError, setActionError] = useState<string | null>(null);
  const applications = loaded.applications.map((application) =>
    withdrawnIds.includes(application.id)
      ? { ...application, status: "WITHDRAWN" as const }
      : application,
  );

  if (loaded.error) return <ErrorState message={loaded.error} />;
  if (loaded.isLoading) return <LoadingState />;
  if (applications.length === 0) {
    return (
      <section>
        <h1>Mes candidatures</h1>
        <EmptyState message="Aucune candidature à afficher." />
      </section>
    );
  }

  return (
    <section>
      <h1>Mes candidatures</h1>
      <p>{applications.length} candidature{applications.length > 1 ? "s" : ""}</p>
      {actionError && <ErrorState message={actionError} />}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Offre</th>
              <th scope="col">Entreprise</th>
              <th scope="col">Année</th>
              <th scope="col">Période</th>
              <th scope="col">Statut de l'offre</th>
              <th scope="col">Statut de la candidature</th>
              <th scope="col">Message</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.offerTitle}</td>
                <td>{application.companyShortName}</td>
                <td>{application.academicYear}</td>
                <td>{PERIOD_LABELS[application.period]}</td>
                <td>{OFFER_STATUS_LABELS[application.offerStatus]}</td>
                <td>
                  <StatusBadge
                    label={APPLICATION_STATUS_LABELS[application.status]}
                    tone={APPLICATION_STATUS_TONES[application.status]}
                  />
                </td>
                <td>{application.message ?? "—"}</td>
                <td>
                  {application.status === "IN_PROGRESS" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (!window.confirm("Voulez-vous retirer cette candidature ?")) return;
                        setActionError(null);
                        void withdrawApplication(token, application.id)
                          .then((updated) => {
                            if (updated.status === "WITHDRAWN") {
                              setWithdrawnIds((ids) => [...new Set([...ids, updated.id])]);
                            }
                          })
                          .catch((reason: unknown) => {
                            if (isUnauthorized(reason)) onUnauthorized();
                            else {
                              setActionError(
                                reason instanceof Error
                                  ? reason.message
                                  : "Retrait de la candidature impossible",
                              );
                            }
                          });
                      }}
                    >
                      Retirer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ApplicationsPage;
