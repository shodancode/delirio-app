import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  Tooltip,
  Link,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  HStack,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsCartDashFill } from "react-icons/bs";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Store } from "../utils/Store";
import Enlace from "../utils/enlaces";

const NavLink = ({ children, path }: { children: ReactNode; path: string }) => (
  <Box
    px={2}
    py={1}
    alignItems={"center"}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    <Link
      href={path}
      _hover={{
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  </Box>
);

export default function WithSubnavigation() {
  const linkHoverColor = useColorModeValue("teal.500", "teal.300");
  const linkColor = useColorModeValue("gray.700", "gray.200");
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { cart } = state;

  const [cartItemsCount, setcartItemsCount] = useState(0);

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <Box>
      <Flex
        as={"header"}
        pos="fixed"
        top="0"
        w={"full"}
        minH={"60px"}
        boxShadow={"sm"}
        zIndex="999"
        justify={"center"}
        css={{
          backdropFilter: "saturate(180%) blur(5px)",
          backgroundColor: useColorModeValue(
            "rgba(236, 238, 240, 0.8)",
            "rgba(23, 25, 35, 0.8)"
          ),
        }}
      >
        <Container as={Flex} maxW={"7xl"} align={"center"}>
          <Flex
            flex={{ base: "0", md: "auto" }}
            display={{ base: "flex", md: "none" }}
          >
            <Tooltip label="Menu" placement="bottom">
              <IconButton
                variant="ghost"
                size={"md"}
                onClick={onToggle}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={"Open Menu"}
                display={{ md: "none" }}
              />
            </Tooltip>
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <HStack spacing={8} alignItems={"center"}>
              <NextLink href={"/"} passHref>
                <Link
                  href="/"
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {" "}
                  <Box>DELIRIO</Box>{" "}
                </Link>
              </NextLink>

              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              ></HStack>
            </HStack>
            <Flex
              direction={"row"}
              display={{ base: "none", md: "flex" }}
              align={"center"}
              flex={{ base: 1, md: "auto" }}
              justify={"center"}
            >
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "none" }}
              >
                {Enlace.map(({ name, path }) => (
                  <NavLink key={path} path={path}>
                    <NextLink href={path} passHref>
                      <Link
                        color={linkColor}
                        _hover={{
                          textDecoration: "none",
                          color: linkHoverColor,
                        }}
                      >
                        {name}
                      </Link>
                    </NextLink>
                  </NavLink>
                ))}
              </HStack>
            </Flex>
          </Flex>

          <Flex justify={{ base: "center", md: "start" }}>
            <Stack
              direction={"row"}
              spacing={2}
              justify={{ base: "end", md: "end" }}
            >
              <Tooltip label="Cambiar tema" placement="bottom">
                <Button variant="ghost" onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Tooltip>
              {cartItemsCount > 0 && (
                <Tooltip label="Carrito" placement="bottom">
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/cart")}
                    p={4}
                  >
                    <BsCartDashFill />

                    <Flex
                      borderRadius="full"
                      justify="center"
                      align="center"
                      bg={useColorModeValue("teal.500", "teal.400")}
                      style={{
                        position: "absolute",
                        width: "1.3rem",
                        height: "1.3rem",
                        color: "white",
                        fontSize: "12px",
                        top: 0,
                        right: 0,
                        transform: "translate(15%, 5%)",
                      }}
                    >
                      {cartItemsCount ? cartItemsCount : <span></span>}
                    </Flex>
                  </Button>
                </Tooltip>
              )}
            </Stack>
          </Flex>
        </Container>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      p={4}
      display={{ md: "none" }}
      zIndex={9999}
      pos="fixed"
      top="60px"
      w={"full"}
      bg={"white"}
      minH={"calc(100vh - 60px)"}
      css={{
        backdropFilter: "saturate(180%) blur(5px)",
        backgroundColor: useColorModeValue(
          "rgba(255, 255, 255, 0.8)",
          "rgba(26, 32, 44, 0.8)"
        ),
      }}
    >
      {Enlace.map(({ name, path }) => (
        <NavLink path={path} key={path}>
          <NextLink href={path} passHref>
            {name}
          </NextLink>
        </NavLink>
      ))}
    </Stack>
  );
};
