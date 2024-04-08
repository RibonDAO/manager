import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import ReportsListSection from ".";

describe("CausessListSection", () => {
  it("should render without error", () => {
    renderComponent(<ReportsListSection />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
