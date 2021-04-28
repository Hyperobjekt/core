import { interpolateRgb, piecewise } from "d3-interpolate";
import * as chromatic from "d3-scale-chromatic";
import { extent, group } from "d3-array";
import { rgb } from "d3-color";
import {
  scaleOrdinal,
  scaleBand,
  scaleLinear,
  scaleQuantile,
  scaleQuantize,
  scaleThreshold,
  scaleSequential,
} from "d3-scale";

/**
 * Returns an array of group values given a selector
 * @param {Array<object>} data
 * @param {function} selector
 * @returns
 */
export const getGroups = (data, selector) => {
  return Array.from(group(data, selector).keys());
};

/**
 * Alias for d3.extent
 */
export const getExtent = extent;

/**
 * Creates a scale for mapping a domain to colors
 * @param {string} type
 * @param {Array} domain
 * @param {Array} colors
 * @returns
 */
export const getColorScale = (type, domain, colors) => {
  if (!Array.isArray(domain))
    throw new Error("must provide domain for color scale");
  switch (type) {
    case "quantile":
      return scaleQuantile().domain(domain).range(colors);
    case "quantize":
      return scaleQuantize().domain(domain).range(colors);
    case "threshold":
      return scaleThreshold().domain(domain).range(colors);
    case "category":
      return scaleOrdinal().domain(domain).range(colors);
    case "linear":
      return scaleLinear().domain(domain).range(colors);
    case "sequential":
      const interpolator = getColorInterpolator(colors);
      return scaleSequential(interpolator).domain(domain);
    default:
      throw new Error("invalid scale type for color scale");
  }
};

/**
 * Returns a scale for mapping domain to a position
 * @param {string} type
 * @param {Array} domain
 * @param {Array} range
 * @param {object} options
 * @returns
 */
export const getPositionScale = (type, domain, range, options = {}) => {
  if (!Array.isArray(domain) || !Array.isArray(range))
    throw new Error("must provide domain and range for position scale");
  let scale;
  switch (type) {
    case "category":
      scale = scaleBand().domain(domain).range(range);
      break;
    case "quantile":
    case "threshold":
      scale = scaleLinear().domain(extent(domain)).range(range);
      break;
    default:
      scale = scaleLinear().domain(domain).range(range);
      break;
  }
  return options.nice ? scale.nice() : scale;
};

/**
 * Takes a position scale and a color scale and creates "chunks"
 * that correspond to rectangles for creating a category scale
 * @returns {Array<object>} [{value, x, width, color}]
 */
export const getCategoryChunks = ({ positionScale, colorScale }) => {
  return colorScale.domain().map((d) => ({
    value: d,
    x: positionScale(d),
    width: positionScale.bandwidth(),
    color: colorScale(d),
  }));
};

/**
 * Takes a position scale and a color scale and creates "chunks"
 * that correspond to rectangles for creating discrete color scales
 * @returns {Array<object>} [{value, x, width, color}]
 */
export const getChunks = ({ positionScale, colorScale }) => {
  const scaleCuts = colorScale.thresholds
    ? colorScale.thresholds()
    : colorScale.quantiles
    ? colorScale.quantiles()
    : colorScale.domain();
  const limits = [
    positionScale.domain()[0],
    ...scaleCuts,
    positionScale.domain()[1],
  ];
  const boxLimits = limits
    .slice(0, limits.length - 1)
    .map((d, j) => [limits[j], limits[j + 1]]);
  return boxLimits.map((l, k) => ({
    value: [l[0], l[1]],
    x: positionScale(l[0]),
    width: positionScale(l[1]) - positionScale(l[0]),
    color: colorScale.range()[k],
  }));
};

/**
 * Gets a color interpolator based on a d3-scale-chromatic color scale
 * string or an array of colors
 * @param {*} value
 * @returns {function}
 */
export const getColorInterpolator = (value) => {
  let interpolate;
  if (Array.isArray(value))
    interpolate = piecewise(interpolateRgb.gamma(2.2), value);
  if (typeof value === "string" && chromatic[`interpolate${value}`])
    interpolate = chromatic[`interpolate${value}`];
  if (!interpolate) throw new Error("cannot create colors");
  return interpolate;
};

/**
 * Takes a d3-scale-chromatic color scale string or an array of colors
 * and maps it to an array where the length corresponds to `numColors`
 * @param {string|Array} value
 * @param {number} numColors
 * @returns {Array<string>} array containing hex formatted strings
 */
export const getColors = (value, numColors) => {
  let interpolate = getColorInterpolator(value);
  const colors = [];
  for (let i = 0; i < numColors; ++i) {
    colors.push(rgb(interpolate(i / (numColors - 1))).formatHex());
  }
  return colors;
};
