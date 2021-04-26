import ContinuousColorScale from "./ContinuousColorScale";
import TickScale from "./TickScale";
import { getExtent } from "./utils";
import PropTypes from "prop-types";

/**
 * Scales take some data and render a tick legend alongside a color scale
 */
const ContinuousScale = ({
  data,
  valueKey = "value",
  colors = "BuGn",
  tickProps = {},
  margin,
  ...props
}) => {
  const domain = getExtent(data, (d) => d[valueKey]);
  return (
    <>
      <ContinuousColorScale colors={colors} margin={margin} {...props} />
      <TickScale
        domain={domain}
        margin={{ ...margin, top: 0 }}
        {...tickProps}
        {...props}
      />
    </>
  );
};

ContinuousScale.propTypes = {
  /**
   * array of data objects
   */
  data: PropTypes.array,
  /**
   * the key to use to retrieve data from a data object
   */
  valueKey: PropTypes.string,
  /**
   * width of the scale
   */
  width: PropTypes.number,
  /**
   * height of the scale
   */
  height: PropTypes.number,
  /**
   * object containing top, right, bottom, left margins for the scale
   */
  margin: PropTypes.object,
  /**
   * boolean indicating if the scale should round to have "nice" values
   */
  nice: PropTypes.bool,
  /**
   * either an array of colors or a string representing a scale from [d3-scale-chromatic](https://observablehq.com/@d3/color-schemes?collection=@d3/d3-scale-chromatic)
   */
  colors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /**
   * Format function or string format provided to d3.format
   */
  tickFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Size of all ticks
   */
  tickSize: PropTypes.number,
  /**
   * Size of outer ticks
   */
  tickSizeOuter: PropTypes.number,
  /**
   * Size of inner ticks
   */
  tickSizeInner: PropTypes.number,
  /**
   * Number of ticks to show (continuous only)
   */
  ticks: PropTypes.number,
  /**
   * an array of tick values to explicitly define tick marks
   */
  tickValues: PropTypes.array,
};

export default ContinuousScale;
