/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import NextLink from "next/link";
import {
  Stack,
  Heading,
  Button,
  Text,
  Select,
  Thead,
  TableCaption,
  TableContainer,
  Link,
  Table,
  Tr,
  Td,
  Tbody,
  Th,
  Image,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Layout from "../components/layout";
import { Store } from "../utils/Store";
import { parseCurrency } from "../utils/currency";

export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const message = cartItems
    .reduce(
      (message, product) =>
        message.concat(
          `* ${product.title} - ${parseCurrency(product.price)}\n`
        ),
      ""
    )
    .concat(
      `\nTotal: ${parseCurrency(
        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
      )}`
    );

  const removeCartHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  //funcion para actualizar el carrito
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: "CARD_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <Layout title={"Carrito de Compra"}>
      <Stack spacing={8} mt={55} minH={"92vh"}>
        <Heading textAlign={"center"} size="lg">
          Carrito de compras
        </Heading>

        {cartItems.length === 0 ? (
          <Stack>
            <Text textAlign={"center"}>No hay elementos en tu carrito</Text>
            <NextLink href="/">
              <Button
                as="a"
                color="teal.400"
                fontWeight="bold"
                textAlign={"center"}
              >
                Regresar
              </Button>
            </NextLink>
          </Stack>
        ) : (
          <TableContainer>
            <Table size={"sm"} variant="striped">
              <Thead>
                <Tr>
                  <Th scope="col">Producto</Th>

                  <Th scope="col">Cantidad</Th>
                  <Th scope="col">Precio</Th>
                  <Th scope="col">Accion</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <Image src={item.image} width={70} height={70} alt="" />
                    </Td>

                    <Td>
                      <Select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Select>
                    </Td>

                    <Td>{parseCurrency(item.price)}</Td>
                    <Td>
                      <Button
                        colorScheme={"teal"}
                        onClick={() => removeCartHandler(item)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Stack>
              <Heading
                textAlign={"center"}
                textColor="GrayText"
                m={5}
                size={"md"}
              >
                Total: ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : S/
                {parseCurrency(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))}
              </Heading>
            </Stack>
            <Stack>
              <Button
                isExternal
                as={Link}
                colorScheme="whatsapp"
                data-testid="complete-order"
                href={`https://api.whatsapp.com/send?phone=51913006451&text=Buen%20d%C3%ADa%2C%20*Delirio%20%7C%20Licorer%C3%ADa*%2C%20%0A%0ADeseo%20adquirir%20los%20siguientes%20productos%3A%0A%0A${encodeURIComponent(
                  message
                )}`}
                leftIcon={
                  <Image src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff" />
                }
                size="lg"
                width="100%"
              >
                Completar pedido
              </Button>
            </Stack>
          </TableContainer>
        )}
      </Stack>
    </Layout>
  );
}
