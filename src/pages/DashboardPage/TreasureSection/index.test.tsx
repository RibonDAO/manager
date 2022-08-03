import React from "react";
import { screen } from "@testing-library/react";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent, waitForPromises } from "config/testUtils";
import integrationFactory from "config/testUtils/factories/integrationFactory";
import { mockGraphqlRequest } from "config/testUtils/test-helper";
import { ALL_INTEGRATIONS_QUERY_NAME } from "services/apiTheGraph/querys/integration";
import TreasureSection from ".";

describe("TreasureSection", () => {
  it("should render without error", () => {
    renderComponent(<TreasureSection />);

    expect(
      screen.getByText("Donation Treasure Balance (USDC)"),
    ).toBeInTheDocument();
  });

  describe("when the integration has balance", () => {
    beforeEach(async () => {
      const fiftyCentInWei = "500000000000000000";
      mockGraphqlRequest(ALL_INTEGRATIONS_QUERY_NAME, {
        integrations: [
          integrationFactory({
            balance: fiftyCentInWei,
          }),
        ],
      });

      renderComponent(<TreasureSection />);

      await waitForPromises();
    });

    it("shows the assigned value", async () => {
      expectTextToBeInTheDocument("0.5");
    });
  });
});
