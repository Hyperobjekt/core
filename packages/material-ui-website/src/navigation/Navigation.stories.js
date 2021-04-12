import React from "react";

import Navigation from "./Navigation";

export default {
  component: Navigation,
  title: "website/Navigation",
  args: {
    links: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "About",
        link: "/about",
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
