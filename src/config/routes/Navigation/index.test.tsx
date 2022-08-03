import { renderComponent } from "config/testUtils";
import Navigation from ".";

describe("Navigation", () => {
  it("should render without error", () => {
    renderComponent(<Navigation />);
  });
});
