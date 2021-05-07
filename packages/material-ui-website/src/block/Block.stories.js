import React, { useState } from "react";

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

export const BlockVisibility = (args) => {
  const [visibleBlocks, setVisibleBlocks] = useState({});

  const handleVisibilityChange = (inView, entry) => {
    const id = entry?.target?.id;
    id &&
      setVisibleBlocks({
        ...visibleBlocks,
        [id]: inView,
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <pre
        style={{
          position: "sticky",
          display: "inline-block",
          top: 24,
          right: 24,
          background: "#000",
          color: "#fff",
          padding: 16,
        }}
      >
        {JSON.stringify(visibleBlocks, null, 2)}
      </pre>
      <Block
        id="primary"
        minHeight="100vh"
        bgcolor="primary.main"
        color="primary.contrastText"
        onVisibleChange={handleVisibilityChange}
        {...args}
      >
        Primary block
      </Block>
      <Block
        id="secondary"
        minHeight="100vh"
        bgcolor="secondary.main"
        color="secondary.contrastText"
        onVisibleChange={handleVisibilityChange}
        {...args}
      >
        Secondary block
      </Block>
    </div>
  );
};
BlockVisibility.args = {};
BlockVisibility.story = {
  parameters: {
    docs: {
      storyDescription: `Each block has an \`onVisibleChange\` callback that can be used to trigger events once a block becomes visible.  A \`.HypBlock-visible\` class is also added to the element when it is visible.`,
    },
  },
};
