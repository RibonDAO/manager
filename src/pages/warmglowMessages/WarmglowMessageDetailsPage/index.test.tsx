import { renderComponent } from "config/testUtils";

import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import WarmglowMessageDetailsPage from ".";

describe("WarmglowMessageDetailsPage", () => {
  it("should render without error", () => {
    renderComponent(<WarmglowMessageDetailsPage />);

    expectTextToBeInTheDocument("Warmglow Message details");
    expectTextToBeInTheDocument("ID");
    expectTextToBeInTheDocument("Status");
    expectTextToBeInTheDocument("Message");
    expectTextToBeInTheDocument("Created at");
    expectTextToBeInTheDocument("Last edited at");
  });
});
