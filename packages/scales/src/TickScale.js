import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { getPositionScale } from "./utils";
import { format } from "d3-format";

export const TickScale = ({
  type = "linear",
  domain,
  width = 200,
  height = 24,
  ticks,
  tickFormat,
  tickValues,
  tickSize,
  tickSizeInner,
  tickSizeOuter,
  nice,
  margin = { left: 0, right: 0 },
  ...props
}) => {
  const innerWidth = width - (margin.left + margin.right);
  const innerScale = getPositionScale(type, domain, [1, innerWidth - 1], {
    nice,
  });
  let axisCreator = axisBottom(innerScale);
  if (tickFormat) {
    let formatFunc =
      typeof tickFormat === "string" ? format(tickFormat) : tickFormat;
    axisCreator = axisCreator.tickFormat(formatFunc);
  }
  if (ticks) axisCreator = axisCreator.ticks(ticks);
  if (tickValues) axisCreator = axisCreator.tickValues(tickValues);
  if (tickSize) axisCreator.tickSize(tickSize);
  if (tickSizeInner) axisCreator.tickSizeInner(tickSizeInner);
  if (tickSizeOuter) axisCreator.tickSizeOuter(tickSizeOuter);
  const axisRef = (axis) => {
    axis && axisCreator(select(axis));
  };

  return (
    <svg width={width} viewBox={[0, 0, width, height]} {...props}>
      <g
        transform={`translate(${margin.left} ${margin.top})`}
        ref={axisRef}
      ></g>
    </svg>
  );
};

export default TickScale;
