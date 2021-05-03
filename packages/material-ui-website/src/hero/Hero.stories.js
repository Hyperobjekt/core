import { Box, Button, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React from "react";

import Hero from "./Hero";

export default {
  component: Hero,
  title: "website/Hero",
};

/**
 * Basic Hero
 */
export const Base = (args) => <Hero {...args}>Hero Content</Hero>;

/**
 * Simple hero with text and a button
 */
export const SimpleHero = (args) => (
  <Hero {...args}>
    <Box mb={3}>
      <Typography variant="h2">Welcome!</Typography>
      <Typography variant="body1">This is a sample hero</Typography>
    </Box>
    <Button variant="contained" color="secondary" onClick={() => alert("Hi!")}>
      Do Something!
    </Button>
  </Hero>
);
SimpleHero.args = {
  align: "center",
  gradient: `radial-gradient(circle at 98% -14%,rgba(225, 149, 255, 0.32) 64%,hsla(281, 100%, 50%, 0.38) 44%), linear-gradient(165deg, #6a00ff 38%, #ff8009 100%)`,
};

/**
 * Image hero with text and a button
 */
export const ImageHero = (args) => (
  <Hero {...args}>
    <Box mb={3}>
      <Typography variant="h2">Welcome!</Typography>
      <Typography variant="body1">This is a sample hero</Typography>
    </Box>
    <Button variant="contained" color="primary" onClick={() => alert("Hi!")}>
      Do Something!
    </Button>
  </Hero>
);
ImageHero.args = {
  image: "https://via.placeholder.com/300x300",
  bgcolor: "grey.700",
  ContainerProps: {
    flexDirection: "row-reverse",
  },
};

/**
 * Image hero with text and a button
 */
export const ImageOverlayHero = (args) => (
  <Hero {...args}>
    <Box mb={3} ml={4} maxWidth={280}>
      <Typography variant="h2">Sample</Typography>
      <Typography variant="body1">
        This is a sample hero with an image and gradient overlay
      </Typography>
    </Box>
  </Hero>
);
ImageOverlayHero.args = {
  variant: "overlay",
  alignItems: "flex-end",
  image:
    "https://evictionlab.org/images/assets/hero/american-flag-evicted-woman.jpg",
  color: "grey.900",
  bgcolor: "grey.100",
  ContainerProps: {
    justifyContent: "flex-start",
  },
  gradient: [
    "70deg",
    "#fff",
    "rgba(255,255,255,0.9) 200px",
    "transparent 600px",
  ],
};
