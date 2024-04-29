import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import CouponDetailsPage from ".";

describe("Coupons Section", () => {
  it("should render without error", () => {
    renderComponent(<CouponDetailsPage />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Expiration")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(screen.getByText("Tickets quantity")).toBeInTheDocument();
    expect(screen.getByText("Tickets availability")).toBeInTheDocument();
    expect(screen.getByText("Reward")).toBeInTheDocument();
  });
});
