import DiscreteColorScale from "./DiscreteColorScale";
import TickScale from "./TickScale";
import {
  getChunks,
  getColors,
  getColorScale,
  getExtent,
  getPositionScale,
} from "./utils";

const QuantizeScale = ({
  data,
  valueKey = "value",
  colors = "BuGn",
  num = 5,
  nice,
  margin,
  tickProps = {},
  ...props
}) => {
  const extent = getExtent(data, (d) => d[valueKey]);
  const scaleColors = getColors(colors, num);
  const positionScale = getPositionScale("quantize", extent, [0, 1], { nice });
  const colorScale = getColorScale(
    "quantize",
    positionScale.domain(),
    scaleColors
  );
  const chunks = getChunks({ positionScale, colorScale });
  const tickValues = [
    ...chunks.map((c) => positionScale.invert(c.x)),
    positionScale.domain()[1],
  ];
  return (
    <>
      <DiscreteColorScale chunks={chunks} margin={margin} {...props} />
      <TickScale
        domain={positionScale.domain()}
        tickValues={tickValues}
        margin={{ ...margin, top: 0 }}
        nice={nice}
        {...tickProps}
        {...props}
      />
    </>
  );
};

export default QuantizeScale;
