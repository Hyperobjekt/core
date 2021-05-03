import React from "react";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import clsx from "clsx";

const styles = (theme) => ({
  vertical: {},
  horizontal: {},
  aroundSm: { padding: theme.spacing(1) },
  aroundMd: { padding: theme.spacing(2) },
  aroundLg: { padding: theme.spacing(3) },
  aroundXl: { padding: theme.spacing(4) },
  betweenSm: {
    "&$horizontal > * + *": {
      marginLeft: theme.spacing(1),
    },
    "&$vertical > * + *": {
      marginTop: theme.spacing(1),
    },
  },
  betweenMd: {
    "&$horizontal > * + *": {
      marginLeft: theme.spacing(2),
    },
    "&$vertical > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  betweenLg: {
    "&$horizontal > * + *": {
      marginLeft: theme.spacing(3),
    },
    "&$vertical > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  betweenXl: {
    "&$horizontal > * + *": {
      marginLeft: theme.spacing(4),
    },
    "&$vertical > * + *": {
      marginTop: theme.spacing(4),
    },
  },
});

/**
 * Stack is used to layout content horizontally or vertically
 * with a set amount of spacing around and between children
 *
 */
const Stack = ({
  direction,
  around,
  between,
  wrap,
  classes,
  className,
  ...props
}) => {
  // set vertical / horizontal default layout props
  const LayoutProps =
    direction === "vertical"
      ? {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: wrap ? "wrap" : "nowrap",
        }
      : {
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: wrap ? "wrap" : "nowrap",
        };
  return (
    <Box
      className={clsx(
        "HypStack-root",
        {
          [classes.vertical]: direction === "vertical",
          [classes.horizontal]: direction === "horizontal",
          [classes.betweenSm]: between === "sm",
          [classes.betweenMd]: between === "md",
          [classes.betweenLg]: between === "lg",
          [classes.betweenXl]: between === "xl",
          [classes.aroundSm]: around === "sm",
          [classes.aroundMd]: around === "md",
          [classes.aroundLg]: around === "lg",
          [classes.aroundXl]: around === "xl",
        },
        className
      )}
      display="flex"
      {...LayoutProps}
      {...props}
    ></Box>
  );
};

Stack.defaultProps = {
  classes: {},
  direction: "horizontal",
  between: "sm",
  around: "none",
  wrap: true,
};

Stack.propTypes = {
  /** object containing class names */
  classes: PropTypes.object,
  /** class name for root */
  className: PropTypes.string,
  /** true to wrap elements at container width */
  wrap: PropTypes.bool,
  /** which direction to stack elements (vertical or horizontal) */
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  /** determines how much space to put between children (none, sm, md, lg, xl) */
  between: PropTypes.oneOf(["none", "sm", "md", "lg", "xl"]),
  /** determines how much padding to put on the container (none, sm, md, lg, xl) */
  around: PropTypes.oneOf(["none", "sm", "md", "lg", "xl"]),
};

export { Stack };
const exportComponent = withStyles(styles, { name: "HypStack" })(Stack);

// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = Stack.displayName;
  exportComponent.propTypes = Stack.propTypes;
  exportComponent.defaultProps = Stack.defaultProps;
}

export default exportComponent;
