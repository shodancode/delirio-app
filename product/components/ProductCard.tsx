import React, { useContext } from "react";
import Router, { useRouter } from "next/router";
import {
  Stack,
  Button,
  Text,
  Image,
  useColorModeValue,
  useToast,
  Box,
} from "@chakra-ui/react";

import { parseCurrency } from "../../utils/currency";
import { CartItem } from "../../cart/types";
import { Product } from "../types";
import CartItemDrawer from "../../cart/components/CartItemDrawer";
import { Store } from "../../utils/Store";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd }) => {
  const [isModalOpen, toggleModal] = React.useState(false);
  const cartItem = React.useMemo<CartItem>(
    () => ({ ...product, quantity: 1 }),
    [product]
  );
  // inicializar el estado
  const { state, dispatch } = useContext(Store);
  const productos = product.id;

  if (!productos) {
    return <div>productos no encontrados</div>;
  }
  const toast = useToast();

  // funcion para agregar al carrito
  // donde enviamos a guardar en nuestra variable de estado global
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: "CARD_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <>
      <Stack
        key={product.id}
        alignItems="center"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"md"}
        rounded={"lg"}
        p={1}
        data-testid="product"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <Stack direction="row" padding={2} spacing={4} width="100%">
          <Image
            backgroundColor="white"
            borderRadius="md"
            height={{ base: 24, sm: 36 }}
            loading="lazy"
            minWidth={{ base: 24, sm: 36 }}
            objectFit="contain"
            src={product.image}
            width={{ base: 24, sm: 36 }}
          />
          <Stack justifyContent="space-between" spacing={1} width="100%">
            <Stack spacing={1}>
              <Text fontWeight="500">{product.title}</Text>
              <Text color="gray.500" fontSize="sm">
                {product.description}
              </Text>
              <Text color="gray.500" fontSize="sm">
                Stock: {product.stock}
              </Text>
            </Stack>
            <Stack
              alignItems="flex-end"
              direction="row"
              justifyContent="space-between"
            >
              <Text as="del" color="gray.500" fontSize="sm" fontWeight="500">
                {parseCurrency(product.highprice)}
              </Text>
              <Text color="teal.500" fontSize="sm" fontWeight="500">
                {parseCurrency(product.price)}
              </Text>
              <Box
                onClick={() =>
                  toast({
                    status: "success",
                    position: "bottom",
                    title: "Se agrego al carrito",
                    duration: 1500,
                    isClosable: true,
                  })
                }
              >
                <Button size="xs" colorScheme={"teal"} onClick={addToCartHandler}>
                  Agregar
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ProductCard;
