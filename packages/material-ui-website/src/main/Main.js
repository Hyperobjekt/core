import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    position: "relative",
    flex: 1,
  },
});

const Main = ({ classes, className, ...props }) => {
  return (
    <main
      id="main"
      className={clsx("HypMain-root", classes.root, className)}
      {...props}
    />
  );
};

Main.defaultProps = {
  classes: {},
};

Main.propTypes = {
  /** object containing class names for elements */
  classes: PropTypes.object,
  /** class name for root element */
  className: PropTypes.string,
};

export { Main };
const exportComponent = withStyles(styles, { name: "HypMain" })(Main);

// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = Main.displayName;
  exportComponent.propTypes = Main.propTypes;
  exportComponent.defaultProps = Main.defaultProps;
}

export default exportComponent;
