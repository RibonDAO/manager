import { screen } from "@testing-library/react";
import { clickOn, renderComponent } from "config/testUtils";
import CopyableAddress from ".";

describe("CopyableAddress", () => {
  const URL = "https://ribon.io";

  it("should render without error", () => {
    renderComponent(<CopyableAddress text={URL} />);

    expect(screen.getByText(URL)).toBeInTheDocument();
  });

  it("should copy to clipboard", () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    renderComponent(<CopyableAddress text="click" />);
    clickOn("click");

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("click");
  });
});
