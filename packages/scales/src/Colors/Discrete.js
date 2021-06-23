import React from "react";
import { getPositionScale } from "./utils";
import { styled } from "@material-ui/styles";

const Svg = styled("svg")({
  display: "block",
});

const Discrete = ({
  chunks,
  width = 200,
  height = 24,
  margin = { left: 0, right: 0, top: 0, bottom: 0 },
  rectProps = {},
}) => {
  const innerWidth = width - (margin.left + margin.right);
  const positionRange = [0, innerWidth];
  const percentToPosition = getPositionScale("linear", [0, 1], positionRange);
  return (
    <Svg width={width} height={height}>
      <g transform={`translate(${margin.left} ${margin.top})`}>
        {chunks.map((c, i) => (
          <rect
            key={c.value}
            x={percentToPosition(c.x)}
            y={0}
            height={height - (margin.bottom + margin.top)}
            width={c.width * innerWidth}
            style={{ fill: c.color }}
            {...rectProps}
          />
        ))}
      </g>
    </Svg>
  );
};

export default Discrete;
