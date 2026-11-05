import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ApplicationsPage from "../src/pages/ApplicationsPage.tsx";
import { stubFetch } from "./helpers/fetchMock.ts";

const application = {
  id: 1,
  offerId: 1,
  offerTitle: "Application React de gestion de flotte",
  companyShortName: "Lumen Digital",
  academicYear: "2026-2027",
  period: "P2",
  offerStatus: "PUBLISHED",
  message: "Motivation",
  status: "IN_PROGRESS",
  appliedAt: "2026-10-02 18:10:00",
};

describe("ApplicationsPage : retrait", () => {
  it("demande confirmation puis retire la candidature", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const fetchMock = stubFetch({
      "/api/applications": () => Response.json([application]),
      "/api/applications/1/withdraw": () => Response.json({
        ...application,
        status: "WITHDRAWN",
      }),
    });

    render(<ApplicationsPage token="jeton" onUnauthorized={vi.fn()} />);

    await screen.findByText("Application React de gestion de flotte");
    fireEvent.click(screen.getByRole("button", { name: "Retirer" }));

    expect(window.confirm).toHaveBeenCalledWith("Voulez-vous retirer cette candidature ?");
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      "/api/applications/1/withdraw",
      expect.objectContaining({ method: "POST", headers: { Authorization: "jeton" } }),
    ));
    expect(await screen.findByText("Retirée")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("n'envoie rien si le retrait est annulé", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const fetchMock = stubFetch({
      "/api/applications": () => Response.json([application]),
    });

    render(<ApplicationsPage token="jeton" onUnauthorized={vi.fn()} />);
    await screen.findByText("Application React de gestion de flotte");
    fireEvent.click(screen.getByRole("button", { name: "Retirer" }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    vi.restoreAllMocks();
  });
});
