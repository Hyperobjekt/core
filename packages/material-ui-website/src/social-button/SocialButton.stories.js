import React from "react";

import SocialButton from "./SocialButton";

export default {
  component: SocialButton,
  title: "website/SocialButton",
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
export const Base = (args) => <SocialButton {...args} />;
