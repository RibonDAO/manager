import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { createMemoryHistory, MemoryHistory } from "history";
import { I18nextProvider } from "react-i18next";
import i18n from "i18n-test";
import AuthenticationProvider, {
  AuthenticationContext,
  IAuthenticationContext,
} from "contexts/authenticationContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "react-router-dom";
import theme from "styles/theme";

import {
  renderHook as renderTestingLibraryHook,
  RenderHookResult,
} from "@testing-library/react-hooks";

export interface RenderWithContextResult {
  component: RenderResult;
  history: MemoryHistory;
}

export type RenderComponentProps = {
  history?: MemoryHistory;
  authenticationProviderValue?: Partial<IAuthenticationContext>;
  locationState?: Record<any, any>;
};

function renderProvider(
  RProvider: any,
  RContext: React.Context<any>,
  value: Record<any, any>,
  children: JSX.Element,
) {
  return (
    <RProvider>
      <RContext.Consumer>
        {(val: Record<any, any>) => (
          <RContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
              ...val,
              ...value,
            }}
          >
            {children}
          </RContext.Provider>
        )}
      </RContext.Consumer>
    </RProvider>
  );
}

function renderAllProviders(
  children: any,
  {
    history = createMemoryHistory(),
    authenticationProviderValue = {},
    locationState = {},
  }: RenderComponentProps = {},
) {
  const queryClient = new QueryClient();
  const historyObject = {
    ...history,
    location: { ...history.location, ...locationState },
  };
  historyObject.location.state = locationState;

  return {
    component: (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <Router location={locationState} navigator={historyObject}>
              {renderProvider(
                AuthenticationProvider,
                AuthenticationContext,
                authenticationProviderValue,
                children,
              )}
            </Router>
          </I18nextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    ),
    history: historyObject,
  };
}

export function renderComponent(
  component: JSX.Element,
  renderComponentProps: RenderComponentProps = {},
): RenderWithContextResult {
  const { component: componentWithProviders, history } = renderAllProviders(
    component,
    renderComponentProps,
  );
  return {
    component: render(componentWithProviders),
    history,
  };
}

type RenderHookReturn = {
  hook: RenderHookResult<any, any>;
  history: MemoryHistory;
};
export function renderHook(
  hook: (props: any) => any,
  renderComponentProps: RenderComponentProps = {},
): RenderHookReturn {
  let history = createMemoryHistory();
  const wrapper = ({ children }: any) => {
    const { component, history: historyObject } = renderAllProviders(
      children,
      renderComponentProps,
    );
    history = historyObject;
    return component;
  };

  return {
    hook: renderTestingLibraryHook(hook, { wrapper }),
    history,
  };
}
