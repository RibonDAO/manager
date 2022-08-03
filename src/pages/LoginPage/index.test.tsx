import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";

import LoginPage from ".";

describe("Login", () => {
  it("should render without error", () => {
    renderComponent(<LoginPage />);

    expect(screen.getByText("Dapp Manager")).toBeInTheDocument();
  });

  it("should show google provider when click on button", () => {
    const mockFunction = jest.fn();
    renderComponent(<LoginPage />, {
      authenticationProviderValue: {
        signInWithGoogle: mockFunction,
      },
    });

    const button = screen.getByText("Login com o Google");
    button.click();

    expect(mockFunction).toHaveBeenCalled();
  });
});
