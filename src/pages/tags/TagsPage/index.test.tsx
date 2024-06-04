import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import TagsPage from ".";

describe("TagsPage", () => {
  it("should render without error", () => {
    renderComponent(<TagsPage />);

    expect(screen.getByText("Tags")).toBeInTheDocument();
  });
});
