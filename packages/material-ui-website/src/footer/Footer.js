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

// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = Footer.displayName;
  exportComponent.propTypes = Footer.propTypes;
  exportComponent.defaultProps = Footer.defaultProps;
}

export default exportComponent;
