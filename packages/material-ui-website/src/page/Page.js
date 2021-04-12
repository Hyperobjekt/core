import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "stretch",
    background: theme.palette.background.default,
  },
  fillViewport: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
});

const Page = ({ classes, className, fillViewport, ...props }) => {
  return (
    <div
      className={clsx(
        "HypPage-root",
        classes.root,
        { [classes.fillViewport]: fillViewport },
        className
      )}
      {...props}
    />
  );
};

Page.propTypes = {
  /** object containing class names for elements */
  classes: PropTypes.object,
  /** class name for root element */
  className: PropTypes.string,
  /** True if the page should be restricted to the viewport size (no scrolling) */
  fillViewport: PropTypes.bool,
};

export { Page };
const exportComponent = withStyles(styles, { name: "HypPage" })(Page);
exportComponent.displayName = "Page";
export default exportComponent;
