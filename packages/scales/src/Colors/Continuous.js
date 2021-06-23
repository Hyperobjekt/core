import React, { useEffect, useMemo, useRef } from "react";
import { getColors } from "./utils";
import { styled } from "@material-ui/styles";

const Container = styled("div")({
  display: "block",
  boxSizing: "border-box",
});

const Continuous = ({
  colorScale,
  width = 256,
  height = 24,
  points = 256,
  ...props
}) => {
  const canvasRef = useRef(null);
  const colors = useMemo(() => {
    if (!colorScale) return null;
    return getColors(colorScale.range(), points);
  }, [points, schemaName]);

  useEffect(() => {
    if (!colors) return;
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
      }}
      {...props}
    >
      <canvas width={points} height={1} ref={canvasRef} />
    </Container>
  );
};

export default Continuous;
