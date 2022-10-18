import * as React from "react";
import NextLink from "next/link";
import {
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Layout from "../components/layout";
import category from "../utils/category";
import Hero from "../components/hero";

export default function Home() {
  return (
    <Layout title={"Licoreria "}>
      <Hero />
      <Stack spacing={1} width="100%">
        <Heading textAlign={"center"} size="lg" mb={10}>
          Categorías
        </Heading>
        <Grid
          gap={6}
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
        >
          {category.categorias.map((categorias) => (
            <Flex
              key={categorias.id}
              borderRadius="lg"
              padding={2}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"xl"}
            >
              <NextLink href={categorias.href}>
                <Stack width="100%" align="center">
                  <Image borderRadius="lg" src={categorias.images}></Image>
                  <Button colorScheme="teal" variant="solid" width="100%">
                    {categorias.name}
                  </Button>
                </Stack>
              </NextLink>
            </Flex>
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
}
