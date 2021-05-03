import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Block from "../block";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    position: "relative",
    minHeight: 420,
    overflow: "hidden",
  },
  container: {},
  imageWrapper: {
    position: "relative",
    zIndex: 2,
  },
  image: {
    display: "block",
    width: "auto",
    maxWidth: "100%",
  },
  content: {
    position: "relative",
    zIndex: 2,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  overlay: {
    "& $imageWrapper": {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      overflow: "hidden",
      zIndex: 1,
    },
    "& $image": {
      margin: "auto",
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
  },
});

/**
 * The Hero component is used to create a callout section that draws attention, usually at the top of the page.
 *
 * All props that are not specific to the Hero component are passed down to the Block component.
 */
const Hero = ({
  classes,
  children,
  align,
  image,
  gradient,
  alt = "",
  variant,
  ContainerProps = {},
  ...props
}) => {
  const gradientString = Array.isArray(gradient)
    ? `linear-gradient(${gradient.join(",")})`
    : gradient;

  const containerProps = {
    align,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    ...ContainerProps,
  };
  console.log("cp", ContainerProps, containerProps);
  return (
    <Block
      classes={{
        root: clsx(classes.root, classes[variant]),
        container: classes.container,
      }}
      bgcolor="primary.main"
      color="primary.contrastText"
      ContainerProps={containerProps}
      {...props}
    >
      <div className={classes.content}>{children}</div>
      {image && (
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={image} alt={alt} />
        </div>
      )}
      {gradientString && (
        <div
          className={classes.gradient}
          style={{ background: gradientString }}
        />
      )}
    </Block>
  );
};

Hero.propTypes = {
  /**
   * Classname overrides (valid keys: `root`, `container`, `imageWrapper`, `image`, `content`, `gradient`, `overlay` )
   */
  classes: PropTypes.object,
  /**
   * URL or path to the image to use in the hero
   */
  image: PropTypes.string,
  /**
   * Alt text to use for the image
   */
  alt: PropTypes.string,
  /**
   * Determines the layout for the hero.  Currently `overlay` is the only available variant.
   */
  variant: PropTypes.string,
  /**
   * A CSS gradient string, or alternatively an array of linear-gradient properties.  Use a gradient creator to make things easier: ([components.ai](https://components.ai/gradient/), [cssgradient.io](https://cssgradient.io/))
   */
  gradient: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /**
   * Props passed to the Container component
   */
  ContainerProps: PropTypes.object,
  /**
   * Optional alignment for the content (e.g. "center")
   */
  align: PropTypes.string,
};

export { Hero };
const exportComponent = withStyles(styles)(Hero);
// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = Hero.displayName;
  exportComponent.propTypes = Hero.propTypes;
  exportComponent.defaultProps = Hero.defaultProps;
}
export default exportComponent;
