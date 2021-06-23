import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { styled, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    position: "absolute",
    top: 0,
  },
  value: {
    position: "absolute",
    transform: `translateX(-50%)`,
    top: -20,
  },
  marker: {
    position: "absolute",
    background: "#000",
    width: 1,
    height: 24,
    marginLeft: -1,
  },
  content: {
    transform: `translateX(-50%)`,
  },
});

const ScaleMarker = ({
  classes,
  className,
  value,
  colorScale,
  positionScale,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(classes.root, className)}
      style={{ left: positionScale(value) * 100 + "%" }}
      {...props}
    >
      <div className={classes.marker} />
      <div className={classes.content}>
        {children}
        <div className={classes.value}>{value}</div>
      </div>
    </div>
  );
};

ScaleMarker.propTypes = {};

export default withStyles(styles)(ScaleMarker);
