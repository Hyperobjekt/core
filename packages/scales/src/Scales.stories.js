import React, { useState } from "react";
import CategoryScale from "./CategoryScale";
// import {
//   CategoryScale,
//   ContinuousScale,
//   QuantileScale,
//   QuantizeScale,
//   ThresholdScale,
// } from ".";
import ContinuousScale from "./ContinuousScale";
import QuantileScale from "./QuantileScale";
import QuantizeScale from "./QuantizeScale";
import ThresholdScale from "./ThresholdScale";

const generateData = (points, generator = (i) => Math.random() * 1000) => {
  let result = [];
  for (let i = 0; i < points; i++) {
    result.push(generator(i));
  }
  return result;
};

// generate sample data
const makeData = (seed = 1000) =>
  generateData(100, () => Math.random() * seed).map((d) => ({
    category: ["a", "b", "c", "d", "e"][Math.floor(Math.random() * 5)],
    value: d,
  }));

const width = 300;
const height = 24;
const margin = { left: 24, right: 24, top: 4, bottom: 4 };
const scaleProps = {
  width,
  height,
  margin,
  nice: true,
  tickProps: {
    ticks: 5,
    tickFormat: ".2s",
  },
};

export default {
  component: ContinuousScale,
  title: "Visualization/Scales",
  args: {
    Scale: ContinuousScale,
    ...scaleProps,
  },
};

/**
 * continuous scale
 */
export const Continuous = ({ Scale, ...args }) => {
  const [data, setData] = useState(makeData(Math.random() * 5000 + 10));
  const updateData = () => setData(makeData(Math.random() * 5000 + 10));
  const marker = {
    ...data[0],
    value: Math.round(data[0].value),
  };
  return (
    <>
      <button style={{ marginBottom: 24 }} onClick={updateData}>
        Randomize Data
      </button>
      <Scale marker={marker} data={data} {...args} />
    </>
  );
};

/**
 * Specific details around style
 */
export const Category = ({ ...args }) => <Continuous {...args} />;
Category.args = { Scale: CategoryScale, tickFormat: (d) => d };
Category.story = {
  parameters: {
    docs: {
      storyDescription: `Best used when data falls within a group of categories`,
    },
  },
};

/**
 * quantize scale
 */
export const Quantize = ({ ...args }) => <Continuous {...args} />;
Quantize.args = { Scale: QuantizeScale, num: 5 };
Quantize.story = {
  parameters: {
    docs: {
      storyDescription: `Quantize scales take the extent of the data and splits it into equal parts based on the \`num\` prop.`,
    },
  },
};

/**
 * quantile scale
 */
export const Quantile = ({ ...args }) => <Continuous {...args} />;
Quantile.args = { Scale: QuantileScale, num: 5 };
Quantile.story = {
  parameters: {
    docs: {
      storyDescription: `Quantile scales takes all of the data and splits it into parts based on the \`num\` prop.  Each part contains the same number of data points.  So if 5 is provided as the \`num\` prop, then the first part will contain the bottom 20% of values, the second part will contain the bottom 20-40% of values, and so on.`,
    },
  },
};

/**
 * threshold scale
 */
export const Threshold = ({ ...args }) => <Continuous {...args} />;
Threshold.args = { Scale: ThresholdScale, thresholds: [500, 1000] };
Threshold.story = {
  parameters: {
    docs: {
      storyDescription: `Threshold scales allow you to provide a set of values to use as threshold markers on the scale.  For example 500 and 1000 are used in this example.`,
    },
  },
};

/**
 * Colors demo
 */
export const Colors = ({ Scale, colors, ...args }) => {
  return (
    <>
      <p>YlGnBu</p>
      <ContinuousScale colors="YlGnBu" {...args} />
      <QuantizeScale colors="YlGnBu" num={5} {...args} />
      <p>Magma</p>
      <ContinuousScale colors="Magma" {...args} />
      <QuantizeScale colors="Magma" num={5} {...args} />
      <p>Rainbow</p>
      <ContinuousScale colors="Rainbow" {...args} />
      <QuantizeScale colors="Rainbow" num={5} {...args} />
      <p>
        <pre>
          <code>["#f00", "#0f0", "#00f"]</code>
        </pre>
      </p>
      <ContinuousScale colors={["#f00", "#0f0", "#00f"]} {...args} />
      <QuantizeScale colors={["#f00", "#0f0", "#00f"]} num={5} {...args} />
    </>
  );
};
Colors.args = { data: makeData(1000).slice(0, 10) };
Colors.story = {
  parameters: {
    docs: {
      storyDescription: `You can use a color array or use a color name from [d3-scale-chromatic](https://observablehq.com/@d3/color-schemes?collection=@d3/d3-scale-chromatic).`,
    },
  },
};
