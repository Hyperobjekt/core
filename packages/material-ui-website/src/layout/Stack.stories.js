import React from "react";
import Stack from "./Stack";

const Block = () => (
  <div style={{ width: 16, height: 16, background: "#ccc" }} />
);

const Blocks = () => (
  <>
    {Array.from(Array(50).keys()).map((i) => (
      <Block />
    ))}
  </>
);

export default {
  component: Stack,
  title: "website/Stack",
  argTypes: {
    around: {
      control: {
        type: "select",
        options: ["none", "sm", "md", "lg", "xl"],
      },
    },
    between: {
      control: {
        type: "select",
        options: ["none", "sm", "md", "lg", "xl"],
      },
    },
    direction: {
      control: {
        type: "radio",
        options: ["vertical", "horizontal"],
      },
    },
    wrap: {
      control: {
        type: "boolean",
      },
    },
  },
};

/**
 * # Basic stack
 *
 * info
 */
export const Base = (args) => (
  <Stack {...args}>
    <Blocks />
  </Stack>
);
