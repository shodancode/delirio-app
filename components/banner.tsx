import * as React from "react";
import {
  Box,
  Image,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { INFORMATION } from "../app/constants";

export default function Banner({banner}) {
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
                src={banner}
              />

           
          </Stack>
        </Stack>
      
    </>
  );
}
