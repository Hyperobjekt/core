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
} from "d3-scale";

export const getGroups = (data, selector) => {
  return Array.from(group(data, selector).keys());
};

export const getExtent = extent;

export const getColorSteps = (name, num) => {
  let interpolate;
  if (Array.isArray(name))
    interpolate = piecewise(interpolateRgb.gamma(2.2), name);
  if (typeof name === "string" && chromatic[`interpolate${name}`])
    interpolate = chromatic[`interpolate${name}`];
  if (!interpolate) throw new Error("cannot create colors");
  const colors = [];
  for (let i = 0; i < num; ++i) {
    colors.push(rgb(interpolate(i / (num - 1))).hex());
  }
  return colors;
};

export const getColorScale = (type, domain, colors, options = {}) => {
  if (!Array.isArray(domain) || !Array.isArray(colors))
    throw new Error("must provide domain and colors for color scale");
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
    default:
      throw new Error("invalid scale type for color scale");
  }
};

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

export const getCategoryChunks = ({ positionScale, colorScale }) => {
  return colorScale.domain().map((d) => ({
    value: d,
    x: positionScale(d),
    width: positionScale.bandwidth(),
    color: colorScale(d),
  }));
};

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

export const getColors = (name, num) => {
  if (Array.isArray(name)) return name;
  if (typeof name === "string") {
    if (chromatic[`scheme${name}`] && chromatic[`scheme${name}`][num]) {
      return chromatic[`scheme${name}`][num];
    } else {
      const interpolate = chromatic[`interpolate${name}`];
      const colors = [];
      for (let i = 0; i < num; ++i) {
        colors.push(rgb(interpolate(i / (num - 1))).hex());
      }
      return colors;
    }
  }
  throw new Error("cannot create colors");
};
