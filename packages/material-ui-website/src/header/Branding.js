import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
  },
  logo: {},
});

/**
 * Branding provides a simple component that displays
 * a logo (w/ optional title) and links to the provided link.
 * Typically used in site headers.
 */
const Branding = ({
  classes,
  className,
  component,
  link,
  logo,
  children,
  ...props
}) => {
  const Component = component;
  return (
    <Component
      className={clsx("HypBranding-root", classes.root, className)}
      href={link}
      {...props}
    >
      {logo && (
        <Box className={clsx("HypBranding-logo", classes.logo)}>{logo}</Box>
      )}
      {children}
    </Component>
  );
};

Branding.defaultProps = {
  classes: {},
  component: "a",
  link: "/",
};

Branding.propTypes = {
  /** Object that provides classnames to elements */
  classes: PropTypes.object,
  /** class name for root element */
  className: PropTypes.string,
  /** root component to use for this component */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** URL to link the site branding to */
  link: PropTypes.string,
  /** Logo image or component */
  logo: PropTypes.node,
  children: PropTypes.any,
};

export { Branding };
const exportComponent = withStyles(styles, { name: "HypBranding" })(Branding);

// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = Branding.displayName;
  exportComponent.propTypes = Branding.propTypes;
  exportComponent.defaultProps = Branding.defaultProps;
}

export default exportComponent;
