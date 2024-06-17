import { renderComponent } from "config/testUtils";

import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import WarmglowMessagesListSection from ".";

describe("WarmglowMessagesListSection", () => {
  it("should render without error", () => {
    renderComponent(<WarmglowMessagesListSection />);

    expectTextToBeInTheDocument("ID");
    expectTextToBeInTheDocument("Status");
    expectTextToBeInTheDocument("Message");
  });
});
