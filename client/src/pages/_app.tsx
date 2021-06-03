import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";

interface MyAppProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider options={{ useSystemColorMode: true }}>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
