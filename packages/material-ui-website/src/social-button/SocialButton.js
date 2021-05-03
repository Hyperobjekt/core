import React from "react";
import PropTypes from "prop-types";
import { IconButton, Link } from "@material-ui/core";
import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Instagram from "@material-ui/icons/Instagram";
import Github from "@material-ui/icons/GitHub";
import YouTube from "@material-ui/icons/YouTube";
import Chain from "@material-ui/icons/Link";
import Envelope from "@material-ui/icons/Email";
import Share from "@material-ui/icons/Share";

const getIcon = (name) => {
  switch (name) {
    case "facebook":
      return Facebook;
    case "twitter":
      return Twitter;
    case "linkedin":
      return LinkedIn;
    case "instagram":
      return Instagram;
    case "github":
      return Github;
    case "youtube":
      return YouTube;
    case "link":
      return Chain;
    case "email":
      return Envelope;
    default:
      return Share;
  }
};

/**
 * Social button allows you to create links and buttons for social actions.
 *
 * - valid icon strings: `facebook`, `twitter`, `linkedin`, `instagram`, `github`, `youtube`, `link`, `email`
 * - provide an `href` prop when linking to a social account
 * - use an `onClick` handler when performing an action (e.g. opening a dialog, triggering something with javascript)
 */
const SocialButton = ({ icon, href, ...props }) => {
  const Icon = typeof icon === "string" ? getIcon(icon) : icon;
  const overrideProps = href
    ? {
        component: Link,
        target: "_blank",
        rel: "noopener noreferrer",
        href,
      }
    : {};

  return (
    <IconButton {...overrideProps} {...props}>
      <Icon />
    </IconButton>
  );
};

SocialButton.defaultProps = {
  icon: "share",
};

SocialButton.propTypes = {
  /** Either a string representing the social icon to use, or an icon component */
  icon: PropTypes.any,
  /** A link to the social media account */
  href: PropTypes.string,
};

export default SocialButton;
