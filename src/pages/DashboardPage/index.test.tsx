import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import DashboardPage from ".";

describe("DashboardPage", () => {
  it("should render without error", () => {
    renderComponent(<DashboardPage />);

    expect(screen.getByText("Treasure Dashboard")).toBeInTheDocument();
  });
});
