import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import UpsertNonProfitPage from ".";

jest.mock("@uiw/react-md-editor", () => ({
  __esModule: true,
}));

describe("UpsertNonProfitPage", () => {
  it("should render without error", () => {
    renderComponent(<UpsertNonProfitPage />);

    expect(screen.getByText("Add New NonProfit")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("should render without error", () => {
    renderComponent(<UpsertNonProfitPage isEdit />);

    expect(screen.getByText("Edit NonProfit")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});
