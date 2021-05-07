# @hyperobjekt/scales

<svg class="jss6" width="300" height="24"><g transform="translate(24 4)"><rect x="0" y="0" height="16" width="50.400000000000006" style="fill: rgb(0, 0, 4);"></rect><rect x="50.400000000000006" y="0" height="16" width="50.400000000000006" style="fill: rgb(81, 18, 124);"></rect><rect x="100.80000000000001" y="0" height="16" width="50.39999999999999" style="fill: rgb(183, 55, 121);"></rect><rect x="151.2" y="0" height="16" width="50.40000000000002" style="fill: rgb(252, 137, 97);"></rect><rect x="201.60000000000002" y="0" height="16" width="50.39999999999999" style="fill: rgb(252, 253, 191);"></rect></g></svg>  
<svg width="300" viewBox="0,0,300,24"><g transform="translate(24 0.5)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle"><path class="domain" stroke="currentColor" d="M1,6V0H251V6"></path><g class="tick" opacity="1" transform="translate(1,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">200</text></g><g class="tick" opacity="1" transform="translate(51,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">360</text></g><g class="tick" opacity="1" transform="translate(101,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">520</text></g><g class="tick" opacity="1" transform="translate(151,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">680</text></g><g class="tick" opacity="1" transform="translate(201,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">840</text></g><g class="tick" opacity="1" transform="translate(251,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">1.0k</text></g></g></svg>

This package consists of react components for creating data scales that can be used for data readouts or legends.

It allows for several different types of scales, including:

- continuous scales
- category scales
- quantile scales
- quantize scales
- threshold scales

Each scale consists of three components

- color scale: renders a color gradient or discrete color blocks
- ticks: labels along on the color scale to indicate where values fall
- marker (option): a point on the scale to label

See the [storybook](https://hyperobjekt.github.io/core/?path=/story/visualization-scales--continuous) for further documentation and usage examples.

## Components

### `<CategoryScale />`

used when data falls within a group of categories

#### Usage

Pass an array of data objects, an accessor key, colors, and formatting props to the scale component.

```js
<CategoryScale
  data={data}
  valueKey="category"
  colors="Rainbow"
  width={300}
  height={24}
  margin={{ left: 24, right: 24, top: 4, bottom: 4 }}
  nice
  tickProps={{
    ticks: 5,
    tickFormat: ".2s",
  }}
/>
```

### `<ContinuousScale />`

Used for a linear range of values

See the [storybook](https://hyperobjekt.github.io/core/?path=/story/visualization-scales--continuous) for usage

### `<QuantileScale />`

Quantile scales takes all of the data and splits it into parts based on the `num` prop. Each part contains the same number of data points. So if 5 is provided as the `num` prop, then the first part will contain the bottom 20% of values, the second part will contain the bottom 20-40% of values, and so on.

#### Usage

See the [storybook](https://hyperobjekt.github.io/core/?path=/story/visualization-scales--quantile) for usage

### `<QuantizeScale />`

Quantize scales take the extent of the data and splits it into equal parts based on the `num` prop.

#### Usage

See the [storybook](https://hyperobjekt.github.io/core/?path=/story/visualization-scales--quantize) for usage

### `<ThresholdScale />`

Threshold scales allow you to provide a set of values to use as threshold markers on the scale.

#### Usage

See the [storybook](https://hyperobjekt.github.io/core/?path=/story/visualization-scales--threshold) for usage

## Utility Functions

The following utility functions are provided by this package:

### `getColors(value, numColors)`

This function will return an array of hex color strings based on the provided `value` parameter.

**Parameters**

- `value`: either a string containing a scale name from [d3-scale-chromatic](https://observablehq.com/@d3/color-schemes) (e.g. "YlGnBu") or an array of color strings (e.g. ["#f00", "#0f0", "#00f"])
- `numColors`: the number of colors to return

### `getColorScale(type, domain, colors)`

Returns a color scale that maps a data domain to a color string.

- `type`: a string representing scale type ("category", "quantile", "quantize", "threshold", "linear", or "sequential")
- `domain`: the data domain for the scale
- `colors`: either a string containing a scale name from [d3-scale-chromatic](https://observablehq.com/@d3/color-schemes) (e.g. "YlGnBu") or an array of color strings (e.g. ["#f00", "#0f0", "#00f"]) that will be used to map domain values to

### `getPositionScale(type, domain, range, options)`

Returns a scale that maps a data domain to a pixel value range.

- `type`: a string representing scale type ("category", "quantile", "threshold", or "linear")
- `domain`: the data domain for the scale
- `range`: the range of pixel values to map to
- `options`: options for the scale
  - `nice`: when true, the domain is adjusted to have [nice values](https://github.com/d3/d3-scale#continuous_nice)
