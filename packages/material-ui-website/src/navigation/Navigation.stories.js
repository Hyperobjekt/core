import React from "react";
import HorizontalNavigation from "./HorizontalNavigation";

import Navigation from "./Navigation";

export default {
  component: Navigation,
  title: "website/Navigation",
  args: {
    links: [
      {
        name: "Home",
        active: true,
        link: "/",
      },
      {
        name: "About",
        link: "",

        subMenu: [
          {
            name: "Team",
            link: "/about/team",
          },
          {
            name: "Mission",
            link: "/about/mission",
          },
        ],
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
  },
};

/**
 * Basic Navigation
 */
export const Base = (args) => <Navigation {...args} />;

/**
 * limit depth
 */
export const TopLevel = (args) => <Navigation {...args} />;
TopLevel.args = { maxDepth: 0 };
TopLevel.story = {
  parameters: {
    docs: {
      storyDescription: `Use the \`maxDepth\` prop to limit how many levels of navigation are output.`,
    },
  },
};
export const Horizontal = (args) => (
  <HorizontalNavigation style={{ marginBottom: 64 }} {...args} />
);
Horizontal.args = { separator: true };
Horizontal.story = {
  parameters: {
    docs: {
      storyDescription: `The \`<HorizontalNavigation />\` component comes with preset styling to provide a base for horizontally layed out navigation.`,
    },
  },
};
