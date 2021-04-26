import DiscreteColorScale from "./DiscreteColorScale";
import TickScale from "./TickScale";
import {
  getChunks,
  getColors,
  getColorScale,
  getExtent,
  getPositionScale,
} from "./utils";

const ThresholdScale = ({
  data,
  valueKey = "value",
  colors = "BuGn",
  thresholds = [100, 500],
  margin,
  tickProps = {},
  nice,
  ...props
}) => {
  const domain = getExtent(data, (d) => d[valueKey]);
  const scaleColors = getColors(colors, thresholds.length + 1);
  const colorScale = getColorScale("threshold", thresholds, scaleColors);
  const positionScale = getPositionScale("threshold", domain, [0, 1], { nice });
  const chunks = getChunks({ positionScale, colorScale });
  return (
    <>
      <DiscreteColorScale chunks={chunks} margin={margin} {...props} />
      <TickScale
        domain={domain}
        tickValues={[
          positionScale.domain()[0],
          ...thresholds,
          positionScale.domain()[1],
        ]}
        margin={{ ...margin, top: 0 }}
        nice={nice}
        {...tickProps}
        {...props}
      />
    </>
  );
};

export default ThresholdScale;
