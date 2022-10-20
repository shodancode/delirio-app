import * as React from "react";
import {
  Box,
  Image,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { INFORMATION } from "../app/constants";

function hero() {
  return (
    <>
     
        <Stack spacing={8}>
          <Stack marginBottom={4} spacing={4}>
            {/* <Slider {...settings} ref={(slider) => setSlider(slider)}>
              {cards.map((url, index) => (
                <Image
                  key={index}
                  borderRadius="lg"
                  height="100%"
                  maxHeight={64}
                  objectFit="cover"
                  src={url}
                />
              ))}
            </Slider> */}
            <Image
                borderRadius="lg"
                height="100%"
                maxHeight={{ base: 44, sm: 72 }}
                objectFit="cover"
                src={INFORMATION.banner}
              />

            <Stack
              alignItems="center"
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 3, sm: 6 }}
            >
              <Box
                
                borderRadius={9999}
                marginTop={{base: -12, sm: -16}}
                minWidth={{ base: 24, sm: 32 }}
                padding={1}
              >
                <Image
                  borderRadius={9999}
                  height={{ base: 36, sm: 36 }}
                  src={INFORMATION.avatar}
                  width={{ base: 36, sm: 36 }}
                />
              </Box>
              <Stack
                alignItems={{ base: "center", sm: "flex-start" }}
                spacing={3}
                textAlign={{ base: "center", sm: "left" }}
              >
                <Stack spacing={0}>
                  <Text fontSize={18} fontWeight="400">
                    {INFORMATION.description}
                  </Text>
                </Stack>
                {/* <Stack direction="row">
                  {INFORMATION.social.map((social) => (
                    <Link key={social.name} isExternal href={social.url}>
                      <Flex
                        alignItems="center"
                        borderRadius={9999}
                        backgroundColor="teal.400"
                        height={10}
                        justifyContent="center"
                        width={10}
                      >
                        <Image
                          src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                        />
                      </Flex>
                    </Link>
                  ))}
                </Stack> */}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      
    </>
  );
}

export default hero;
