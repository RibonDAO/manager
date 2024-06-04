import { render } from "@testing-library/react";
import { waitForPromises } from "config/testUtils";
import App from "./App";

jest.mock("@uiw/react-md-editor", () => ({
  __esModule: true,
}));

test("renders learn react link", async () => {
  render(<App />);
  await waitForPromises();
});
