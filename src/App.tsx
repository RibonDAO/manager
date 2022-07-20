import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import RoutesComponent from "config/routes";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AuthenticationProvider from "contexts/authenticationContext";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={extendTheme(theme)}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <AuthenticationProvider>
              <RoutesComponent />
            </AuthenticationProvider>
          </BrowserRouter>
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
