import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import CouponsListSection from ".";

describe("Coupons Section", () => {
  it("should render without error", () => {
    renderComponent(<CouponsListSection />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Expiration")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(screen.getByText("Reward")).toBeInTheDocument();
    expect(screen.getByText("Tickets")).toBeInTheDocument();
  });
});
