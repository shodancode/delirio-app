import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Store } from "../utils/Store";
import Navbar from "./navbar";
import Footer from "./footer";
import Hero from "./hero";
import { Container, useColorModeValue } from "@chakra-ui/react";

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);

  const { cart } = state;

  const [cartItemsCount, setcartItemsCount] = useState(0);

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <div>
      <Head>
        <title>{title ? title + " - Delirio" : "Delirio"}</title>
        <meta
          name="description"
          content="Delirio. Hecho con cariño para los amantes
          del alcohol."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Container borderRadius="sm" maxWidth="container.xl" mt={45} padding={4}>
        <>{children}</>
      </Container>

      <Footer />
    </div>
  );
}
