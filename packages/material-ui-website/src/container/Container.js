import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles, Box } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    marginLeft: `auto`,
    marginRight: `auto`,
    width: `100%`,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 1280,
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: 1440,
    },
  },
});

/**
 * The container component is a responsive wrapper for content on the site.  Using the container component ensures:
 *
 * - content does not exceed the maxWidth for content for the page
 * - appropriate padding is applied to content to prevent it from going too close to screen edges
 *
 * The default container provides the following padding / maxWidths:
 *
 * - `xs` breakpoint (< 600px):
 *   - fluid width, 2 spacing units (16px) of padding on left / right of container
 * - `sm` breakpoint (600px - 960px):
 *   - fluid width, 3 spacing units (24px) of padding on left / right of container
 * - `md` breakpoint (960px - 1280px):
 *   - fluid width, 6 spacing units (48px) of padding on left / right of container
 * - `lg` breakpoint (1280px - 1920px):
 *   - fixed container width of 1280px
 *   - fluid width, 6 spacing units (48px) of padding on left / right of container
 * - `xl` breakpoint (> 1920px):
 *   - fixed container width of 1440px
 *   - fluid width, 6 spacing units (48px) of padding on left / right of container
 *
 * The container component is based off of the [Material UI box](https://material-ui.com/components/box/) component, so all [box props](https://material-ui.com/components/box/#api) and [style props](https://material-ui.com/system/basics/#all-inclusive) are available.
 */
const Container = ({ classes, className, ...props }) => (
  <Box
    className={clsx(classes.root, className)}
    display="flex"
    flexDirection="column"
    {...props}
  />
);

Container.defaultProps = {
  classes: {},
};

Container.propTypes = {
  /**
   * Object with class name overrides (valid keys: `root`)
   */
  classes: PropTypes.object,
};

export { Container };
const exportComponent = withStyles(styles, {
  name: "HypContainer",
})(Container);

// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = Container.displayName;
  exportComponent.propTypes = Container.propTypes;
  exportComponent.defaultProps = Container.defaultProps;
}

export default exportComponent;
