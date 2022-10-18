import * as React from "react";
import NextLink from "next/link";
import {
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Button,
} from "@chakra-ui/react";
import ProductItem from '../components/ProductItem'
import Layout from '../components/layout'
import category from '../utils/category'
import Hero from "../components/hero";


export default function Home() {
  return (
    <Layout title={"Licoreria "}>
      <Hero/>
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
          borderColor="gray.300"
          borderRadius="md"
          borderWidth={1}
          padding={2}
        >
          <NextLink href={categorias.href}>
            <Stack width="100%" align="center">
              <Image src={categorias.images}></Image>
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
