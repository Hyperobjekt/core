import DiscreteColorScale from "./DiscreteColorScale";
import TickScale from "./TickScale";
import {
  getCategoryChunks,
  getColors,
  getColorScale,
  getGroups,
  getPositionScale,
} from "./utils";

const CategoryScale = ({
  data,
  categoryKey = "category",
  categorySort,
  colors = "BuGn",
  margin,
  nice,
  tickProps = {},
  children,
  ...props
}) => {
  // pull category names
  const categories = getGroups(data, (d) => d[categoryKey]).sort(categorySort);
  const scaleColors = getColors(colors, categories.length);
  const colorScale = getColorScale("category", categories, scaleColors);
  const positionScale = getPositionScale("category", categories, [0, 1]);
  const chunks = getCategoryChunks({ positionScale, colorScale });
  return (
    <>
      <DiscreteColorScale chunks={chunks} margin={margin} {...props} />
      <TickScale
        type="category"
        domain={positionScale.domain()}
        margin={{ ...margin, top: 0 }}
        nice={false}
        {...tickProps}
        {...props}
      />
      {children}
    </>
  );
};

export default CategoryScale;
