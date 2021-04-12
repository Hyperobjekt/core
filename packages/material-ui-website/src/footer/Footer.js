import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    flex: 0,
  },
});

const Footer = ({ classes, className, ...props }) => {
  return (
    <footer
      className={clsx("HypFooter-root", classes.root, className)}
      id="footer"
      {...props}
    />
  );
};

Footer.defaultProps = {
  classes: {},
};

export { Footer };
const exportComponent = withStyles(styles, { name: "HypFooter" })(Footer);
exportComponent.displayName = "Footer";
export default exportComponent;
