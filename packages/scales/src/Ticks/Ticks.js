import { select } from "d3-selection";
import { axisBottom } from "d3-axis";

export const Ticks = ({ height = 24, axisProps = {}, ...props }) => {
  const { width, margin, positionScale } = useScaleContext();
  const innerWidth = width - (margin.left + margin.right);

  // make a copy of the position scale to map domain to pixel values
  const innerScale = positionScale.copy().range([1, innerWidth - 1]);

  // create axis
  let axisCreator = axisBottom(innerScale);

  // apply axis axisProps
  Object.entries(axisProps).forEach(([key, value]) => {
    if (typeof axisCreator[key] === "function") {
      Array.isArray(value)
        ? axisCreator[key].call(axisCreator, value)
        : axisCreator[key](value);
    }
  });

  // create axis with dom element (<g>)
  const axisRef = (axis) => {
    axis && axisCreator(select(axis));
  };

  return (
    <svg width={width} viewBox={[0, 0, width, height]} {...props}>
      <g transform={`translate(${margin.left} 0.5)`} ref={axisRef}></g>
    </svg>
  );
};

export default Ticks;
