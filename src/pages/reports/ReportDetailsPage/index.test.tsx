import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import ReportDetailsPage from ".";

describe("ReportDetailsPage", () => {
  it("should render without error", () => {
    renderComponent(<ReportDetailsPage />);

    expect(screen.getByText("Report details")).toBeInTheDocument();
  });
});
