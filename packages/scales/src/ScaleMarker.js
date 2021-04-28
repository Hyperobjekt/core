import React from "react";
import PropTypes from "prop-types";
import { styled } from "@material-ui/core";

const Marker = styled("div")({
  position: "absolute",
  width: 2,
  height: 24,
  marginLeft: -1,
  background: "#f00",
});

const ScaleMarker = ({ value, data, colorScale, positionScale, ...props }) => {
  return (
    <Marker style={{ left: positionScale(value) * 100 + "%" }}>{value}</Marker>
  );
};

ScaleMarker.propTypes = {};

export default ScaleMarker;
