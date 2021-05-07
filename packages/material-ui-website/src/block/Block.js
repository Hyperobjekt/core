import React, { useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import Container from "../container";
import { useInView } from "react-intersection-observer";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 0),
  },
  visible: {},
  container: {},
});

/**
 * The Block component is used to create a distinct section on the page.  By default the Block component has the following styles applied:
 *
 * - 6 units (48px) of padding on the top / bottom of the block
 * - fluid width to fill the full width of the page (or parent element)
 * - content within the block follows the constraints of the Container component
 *
 * The root Block component is a [Material UI box](https://material-ui.com/components/box/) component, so all [box props](https://material-ui.com/components/box/#api) and [style props](https://material-ui.com/system/basics/#all-inclusive) are available.
 */
const Block = ({
  classes,
  className,
  children,
  onVisibleChange,
  IntersectionOptions,
  ContainerProps,
  ...props
}) => {
  // trigger events based on block visibility
  const { ref, inView, entry } = useInView(IntersectionOptions);
  useEffect(() => {
    onVisibleChange && onVisibleChange(inView, entry);
  }, [inView]);
  return (
    <Box
      ref={ref}
      className={clsx(
        "HypBlock-root",
        classes.root,
        { "HypBlock-visible": inView, [classes.visible]: inView },
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
