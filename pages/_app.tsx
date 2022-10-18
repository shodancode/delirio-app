import * as React from "react";
import Head from "next/head";
import { StoreProvider } from '../utils/Store'
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return(
    <>
    <Head>
        <title>Licoreria - Delirio</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        <meta content="Deliro" name="author" />
        <meta content="Delirio" name="copyright" />
        <link rel="icon" href="/favicon.png" />
    </Head>
    <ChakraProvider theme={theme}>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
    </ChakraProvider>
    </>
  )
  
}

export default MyApp
