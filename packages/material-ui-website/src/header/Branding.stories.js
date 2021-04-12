import { withStyles } from "@material-ui/core";
import React from "react";

import Branding from "./Branding";

export default {
  component: Branding,
  title: "website/Branding",
  args: {
    logo: <img src="https://via.placeholder.com/32x32" alt="logo" />,
  },
};

/**
 * Basic branding
 */
export const Base = (args) => <Branding {...args}>My Website</Branding>;
Base.args = {
  logo: <img src="https://via.placeholder.com/32x32" alt="logo" />,
};

const StyledBranding = withStyles({
  root: {
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "#999",
    textDecoration: "none",
    border: `1px solid #ccc`,
    padding: 8,
  },
  logo: {
    marginRight: 8,
    "& img": { display: "block" },
  },
})(Branding);
export const Styled = (args) => (
  <StyledBranding {...args}>My Website</StyledBranding>
);
