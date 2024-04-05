import { screen, waitFor } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import UpsertReportPage from ".";

describe("UpsertReportPage", () => {
  it("should render the create page without error", async () => {
    renderComponent(<UpsertReportPage />);
    await waitFor(() => {
      expect(screen.getByText("Add new report")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });

  it("should render the edit page without error", async () => {
    renderComponent(<UpsertReportPage isEdit />);

    await waitFor(() => {
      expect(screen.getByText("Edit report")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });
});
