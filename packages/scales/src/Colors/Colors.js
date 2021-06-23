import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Continuous from "./Continuous";
import Discrete from "./Discrete";

const Colors = ({ colors = "YlGnBu", height = 24, ...props }) => {
  const {
    type,
    width,
    domain,
    margin,
    thresholds,
    positionScale,
    colorScale,
    setColorScale,
  } = useScaleContext();

  // set the color scale in context when type, domain, or colors change
  useEffect(() => {
    const colorsDomain = type === "threshold" ? thresholds : domain;
    setColorScale && setColorScale(getColorScale(type, colorsDomain, colors));
  }, [type, domain, colors, thresholds]);

  // render nothing if there is no color scale
  if (!colorScale) return null;

  // render color scales
  switch (type) {
    case "category":
    case "quantize":
    case "quantile":
    case "threshold":
      const createChunks = type === "category" ? getCategoryChunks : getChunks;
      return (
        <Discrete
          chunks={createChunks({ colorScale, positionScale })}
          width={width}
          height={height}
          margin={margin}
          {...props}
        />
      );
    case "continuous":
      return (
        <Continuous
          colorScale={colorScale}
          width={width}
          height={height}
          margin={margin}
          {...props}
        />
      );
    default:
      throw new Error("no color scale for provided type");
  }
};

Colors.propTypes = {
  colors: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  height: PropTypes.number,
  margin: PropTypes.object,
};

export default Colors;
