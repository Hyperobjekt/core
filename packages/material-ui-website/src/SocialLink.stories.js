import React from "react";

import SocialLink from "./SocialLink";

export default {
  component: SocialLink,
  title: "website/SocialLink",
  argTypes: {
    icon: {
      control: {
        type: "select",
        options: [
          "facebook",
          "twitter",
          "github",
          "linkedin",
          "instagram",
          "youtube",
          "link",
          "email",
          "share",
        ],
      },
    },
  },
  args: {
    icon: "facebook",
  },
};

/**
 * Basic social button
 */
export const Base = (args) => <SocialLink {...args} />;
