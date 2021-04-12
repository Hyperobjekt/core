import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const styles = (theme) => ({
  root: {
    display: "flex",
    flex: 0,
  },
});

const Footer = ({ classes, className, props }) => {
  return (
    <footer
      className={clsx("HypFooter-root", classes.root, className)}
      id="footer"
      {...props}
    />
  );
};

Footer.propTypes = {};

export { Footer };
const exportComponent = withStyles(styles, { name: "HypFooter" })(Footer);
exportComponent.displayName = "Footer";
export default exportComponent;
