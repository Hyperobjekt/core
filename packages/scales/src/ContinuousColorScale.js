import React, { useEffect, useMemo, useRef } from "react";
import { getColors } from "./utils";
import { styled } from "@material-ui/styles";

const Container = styled("div")({
  display: "block",
  boxSizing: "border-box",
});

const ContinuousColorScale = ({
  colors: schemaName,
  points = 256,
  width = 200,
  height = 24,
  margin = { left: 0, right: 0, top: 0, bottom: 0 },
  ...props
}) => {
  const canvasRef = useRef(null);
  const colors = useMemo(() => {
    return getColors(schemaName, points);
  }, [points, schemaName]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const context = canvas.getContext("2d");
    for (let i = 0; i < points; ++i) {
      context.fillStyle = colors[i];
      context.fillRect(i, 0, 1, 1);
    }
  }, [width, height, points, colors]);

  return (
    <Container
      style={{
        width,
        height,
        paddingTop: margin.top,
        paddingRight: margin.right,
        paddingBottom: margin.bottom,
        paddingLeft: margin.left,
      }}
      {...props}
    >
      <canvas width={points} height={1} ref={canvasRef} />
    </Container>
  );
};

export default ContinuousColorScale;
