import { renderComponent } from "config/testUtils";

import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import TagDetailsPage from ".";

describe("TagDetailsPage", () => {
  it("should render without error", () => {
    renderComponent(<TagDetailsPage />);

    expectTextToBeInTheDocument("Tag details");
    expectTextToBeInTheDocument("ID");
    expectTextToBeInTheDocument("Status");
    expectTextToBeInTheDocument("Name");
    expectTextToBeInTheDocument("Non Profits");
    expectTextToBeInTheDocument("Created at");
    expectTextToBeInTheDocument("Last edited at");
  });
});
