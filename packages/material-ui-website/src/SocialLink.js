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

const SocialButton = ({ icon, ...props }) => {
  const Icon = typeof icon === "string" ? getIcon(icon) : icon;
  return (
    <IconButton {...props}>
      <Icon />
    </IconButton>
  );
};

SocialButton.defaultProps = {
  component: Link,
};

SocialButton.propTypes = {};

export default SocialButton;
