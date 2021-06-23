import React, { useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import Container from "../container";
import { useInView } from "react-intersection-observer";

const styles = (theme) => ({
  root: {},
  visible: {},
  container: {},
  noPadding: {
    padding: 0,
  },
  small: {
    padding: theme.spacing(3, 0),
  },
  medium: {
    padding: theme.spacing(6, 0),
  },
  large: {
    padding: theme.spacing(9, 0),
  },
});

/**
 * The Block component is used to create a distinct section on the page.  By default the Block component has the following styles applied:
 *
 * - 6 units (48px) of padding on the top / bottom of the block
 * - fluid width to fill the full width of the page (or parent element)
 * - content within the block follows the constraints of the Container component
 *
 * The root Block component is a [Material UI box](https://material-ui.com/components/box/) component, so all [box props](https://material-ui.com/components/box/#api) and [style props](https://material-ui.com/system/basics/#all-inclusive) are available.
 *
 * ## Classes
 *
 * Provide class names in the classes object with the following keys to override styles:
 *
 * - `root`: applied to the root element
 * - `visible`: applied to the root element when it is visible in the viewport
 * - `noPadding`: applied to the root when `noPadding` prop is true
 * - `small`: applied to the root when `small` prop is true
 * - `large`: applied to the root when `large` prop is true
 * - `container`: applied to the `<Container/>` element
 */
const Block = ({
  classes,
  className,
  children,
  noPadding,
  small,
  medium,
  large,
  onVisibleChange,
  IntersectionOptions,
  ContainerProps,
  ...props
}) => {
  // trigger events based on block visibility
  const { ref, inView, entry } = useInView(IntersectionOptions);
  // check if padding props exist so we know if we should set default padding or not (default = medium)
  const boxPaddingProps = ["p", "pt", "pr", "pb", "pl", "px", "py"];
  const hasPaddingProps =
    small ||
    large ||
    noPadding ||
    Object.keys(props).find((key) => boxPaddingProps.indexOf(key) > -1);
  console.log({ hasPaddingProps, props });
  useEffect(() => {
    onVisibleChange && onVisibleChange(inView, entry);
  }, [inView]);
  return (
    <Box
      ref={ref}
      className={clsx(
        "HypBlock-root",
        classes.root,
        {
          "HypBlock-visible": inView,
          "HypBlock-noPadding": noPadding,
          "HypBlock-small": small,
          "HypBlock-large": large,
          [classes.visible]: inView,
          [classes.noPadding]: noPadding,
          [classes.small]: small,
          [classes.large]: large,
          [classes.medium]: !hasPaddingProps || medium,
        },
        className
      )}
      {...props}
    >
      <Container className={clsx(classes.container)} {...ContainerProps}>
        {children}
      </Container>
    </Box>
  );
};

Block.defaultProps = {
  ContainerProps: {},
  IntersectionOptions: {},
};

Block.propTypes = {
  /**
   * Object with class name overrides (valid keys: `root`, `container`)
   */
  classes: PropTypes.object,
  /**
   * Props to pass to the inner Container component
   */
  ContainerProps: PropTypes.object,
  /**
   * Handler function for when the visibility of the block changes based on scroll position
   */
  onVisibleChange: PropTypes.func,
  /**
   * Options passed to the `useInView` hook from [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer#readme)
   */
  IntersectionOptions: PropTypes.object,
  /**
   * Disables padding on the block
   */
  noPadding: PropTypes.bool,
  /**
   * Use small padding preset
   */
  small: PropTypes.bool,
  /**
   * use large padding preset
   */
  large: PropTypes.bool,
};

export { Block };
const exportComponent = withStyles(styles, { name: "HypBlock" })(Block);

// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = Block.displayName;
  exportComponent.propTypes = Block.propTypes;
  exportComponent.defaultProps = Block.defaultProps;
}

export default exportComponent;
