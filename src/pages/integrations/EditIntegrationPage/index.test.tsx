import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import EditIntegrationPage from ".";

describe("EditIntegrationPage", () => {
  it("should render without error", () => {
    renderComponent(<EditIntegrationPage />);

    expect(screen.getByText("Edit Integration")).toBeInTheDocument();
    expect(screen.getByText("Save changes")).toBeInTheDocument();
  });
});
