import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

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

Main.propTypes = {
  /** object containing class names for elements */
  classes: PropTypes.object,
  /** class name for root element */
  className: PropTypes.string,
};

export { Main };
const exportComponent = withStyles(styles, { name: "HypMain" })(Main);
exportComponent.displayName = "Main";
export default exportComponent;
