import React from "react";

import Container from "./Container";

export default {
  component: Container,
  title: "website/Container",
};

/**
 * Container demo
 */
export const Base = (args) => (
  <Container
    style={{ boxShadow: `0 0 0 1px #cbb`, background: "#fee" }}
    {...args}
  >
    <div style={{ boxShadow: `0 0 0 1px #bcb`, background: "#efe" }}>
      Container
    </div>
  </Container>
);
