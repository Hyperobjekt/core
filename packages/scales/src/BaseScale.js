import { styled } from "@material-ui/styles";
import React from "react";
import ScaleMarker from "./ScaleMarker";

const ScaleContainer = styled("div")({
  position: "relative",
});

/**
 * Scales take some data and render a tick legend alongside a color scale
 */
const BaseScale = ({
  data,
  valueKey = "value",
  marker,
  markerComponent = ScaleMarker,
  positionScale,
  colorScale,
  children,
  width,
  margin,
  ...props
}) => {
  const Marker = markerComponent;
  return (
    <ScaleContainer style={{ width }} {...props}>
      <div
        style={{
          position: "relative",
          marginLeft: margin.left,
          marginRight: margin.right,
        }}
      >
        {marker && (
          <Marker
            value={marker[valueKey] ? marker[valueKey] : marker}
            data={data}
            positionScale={positionScale}
            colorScale={colorScale}
          />
        )}
      </div>

      {children}
    </ScaleContainer>
  );
};

BaseScale.propTypes = {};

export default BaseScale;
