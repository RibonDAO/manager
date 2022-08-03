import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import IntegrationsListSection from ".";

describe("TreasureSection", () => {
  it("should render without error", () => {
    renderComponent(<IntegrationsListSection />);

    expect(screen.getByText("Wallet Address")).toBeInTheDocument();

    expect(screen.getByText("Integration Address")).toBeInTheDocument();
  });
});
