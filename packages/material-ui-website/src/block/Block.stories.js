import React from "react";

import Block from "./Block";

export default {
  component: Block,
  title: "website/Block",
};

/**
 * block demo
 */
export const Base = (args) => (
  <Block {...args}>
    <div style={{ boxShadow: `0 0 0 1px #bcb`, background: "#efe" }}>Block</div>
  </Block>
);
Base.args = {
  style: {
    boxShadow: `0 0 0 1px #bbc`,
    background: "#eef",
  },
  ContainerProps: {
    style: { boxShadow: `0 0 0 1px #cbb`, background: "#fee" },
  },
};
