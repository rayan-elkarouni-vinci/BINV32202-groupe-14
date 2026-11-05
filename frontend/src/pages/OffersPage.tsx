import { useState } from "react";
import EmptyState from "../components/EmptyState.tsx";
import ErrorState from "../components/ErrorState.tsx";
import LoadingState from "../components/LoadingState.tsx";
import OfferTable from "../components/OfferTable.tsx";
import { useOffers } from "../hooks/useOffers.ts";
import { useApplications } from "../hooks/useApplications.ts";
import type { Application, ApplicationStatus } from "../models/application.ts";
import { PERIOD_CODES, type PeriodCode } from "../models/offer.ts";
import type { User } from "../models/user.ts";
import { PERIOD_LABELS } from "../utils/labels.ts";

interface OffersPageProps {
  user: User;
  token: string;
  onUnauthorized: () => void;
}

const DESCRIPTIONS = {
  ADMIN: "Toutes les offres, tous statuts confondus.",
  STUDENT: "Les offres publiées.",
  CONTACT: "Les offres que vous avez déposées.",
} as const;

const OffersPage = ({ user, token, onUnauthorized }: OffersPageProps) => {
  const [period, setPeriod] = useState<PeriodCode | undefined>();
  const { offers, isLoading, error } = useOffers(token, period, onUnauthorized);
  const applicationsState = useApplications(token, onUnauthorized, user.kind === "STUDENT");
  const [localApplications, setLocalApplications] = useState<Application[]>([]);
  const applications = [
    ...applicationsState.applications.filter(
      (application) => !localApplications.some((local) => local.id === application.id),
    ),
    ...localApplications,
  ];

  const applicationStatuses: Partial<Record<number, ApplicationStatus>> = Object.fromEntries(
    applications
      .filter((application) => application.status !== "WITHDRAWN")
      .map((application) => [application.offerId, application.status]),
  );
  const availableOffers = offers.filter((offer) => applicationStatuses[offer.id] === undefined);
  const appliedOffers = offers.filter((offer) => applicationStatuses[offer.id] !== undefined);

  const renderContent = () => {
    if (error) return <ErrorState message={error} />;
    if (user.kind === "STUDENT" && applicationsState.error) {
      return <ErrorState message={applicationsState.error} />;
    }
    if (isLoading || applicationsState.isLoading) return <LoadingState />;
    if (offers.length === 0) return <EmptyState message="Aucune offre à afficher." />;
    if (user.kind !== "STUDENT") {
      return (
        <>
          <p className="result-count">
            {offers.length} offre{offers.length > 1 ? "s" : ""}
          </p>
          <OfferTable offers={offers} user={user} token={token} onUnauthorized={onUnauthorized} />
        </>
      );
    }
    return (
      <>
        <section>
          <h2>Offres disponibles</h2>
          {availableOffers.length === 0 ? (
            <EmptyState message="Aucune offre disponible." />
          ) : (
            <OfferTable
              offers={availableOffers}
              user={user}
              token={token}
              onUnauthorized={onUnauthorized}
              onApplicationSubmitted={(application) => {
                setLocalApplications((current) => [...current, application]);
              }}
            />
          )}
        </section>
        <section>
          <h2>Offres déjà candidatées</h2>
          {appliedOffers.length === 0 ? (
            <EmptyState message="Aucune offre déjà candidatée." />
          ) : (
            <OfferTable
              offers={appliedOffers}
              user={user}
              token={token}
              onUnauthorized={onUnauthorized}
              applicationStatuses={applicationStatuses}
            />
          )}
        </section>
      </>
    );
  };

  return (
    <section>
      <h1>Offres de stage</h1>
      <p>{DESCRIPTIONS[user.kind]}</p>
      <label>
        <span>Période</span>
        <select
          aria-label="Période"
          value={period ?? ""}
          onChange={(event) =>
            setPeriod(event.target.value === "" ? undefined : (event.target.value as PeriodCode))
          }
        >
          <option value="">Toutes les périodes</option>
          {PERIOD_CODES.map((code) => (
            <option key={code} value={code}>
              {PERIOD_LABELS[code]}
            </option>
          ))}
        </select>
      </label>
      {renderContent()}
    </section>
  );
};

export default OffersPage;
