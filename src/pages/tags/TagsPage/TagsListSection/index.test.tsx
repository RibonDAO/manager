import { renderComponent } from "config/testUtils";

import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import TagsListSection from ".";

describe("CausessListSection", () => {
  it("should render without error", () => {
    renderComponent(<TagsListSection />);

    expectTextToBeInTheDocument("ID");
    expectTextToBeInTheDocument("Status");
    expectTextToBeInTheDocument("Name");
    expectTextToBeInTheDocument("Non Profits");
  });
});
