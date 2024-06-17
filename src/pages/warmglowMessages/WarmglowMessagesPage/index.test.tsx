import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import WarmglowMessagesPage from ".";

describe("WarmglowMessagesPage", () => {
  it("should render without error", () => {
    renderComponent(<WarmglowMessagesPage />);

    expect(screen.getByText("Warmglow Messages")).toBeInTheDocument();
  });
});
