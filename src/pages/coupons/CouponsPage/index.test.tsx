import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import CouponsPage from ".";

describe("CouponsPage", () => {
  it("should render without error", () => {
    renderComponent(<CouponsPage />);

    expect(screen.getByText("Coupons")).toBeInTheDocument();
  });
});
