import { screen, waitFor } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import UpsertCouponPage from ".";

describe("UpsertCouponPage", () => {
  it("should render the create page without error", async () => {
    renderComponent(<UpsertCouponPage />);
    await waitFor(() => {
      expect(screen.getByText("Add new coupon")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });

  it("should render the edit page without error", async () => {
    renderComponent(<UpsertCouponPage isEdit />);

    await waitFor(() => {
      expect(screen.getByText("Edit coupon")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });
});
