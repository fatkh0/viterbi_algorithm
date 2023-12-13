import { Box } from "@mui/material";
import { ControlPanel } from "./components/ControlPanel";
import { RechartsGraph } from "./RechartsGraph";
import { useEffect, useRef, useState } from "react";
import { Legend } from "./components/Legend";

export function Graph(): JSX.Element {
  const graphWrapperRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (graphWrapperRef.current?.clientWidth)
      setWidth(graphWrapperRef.current.clientWidth);
  }, [graphWrapperRef.current?.clientWidth]);

  useEffect(() => {
    if (graphWrapperRef.current?.clientHeight)
      setHeight(graphWrapperRef.current.clientHeight);
  }, [graphWrapperRef.current?.clientHeight]);

  useEffect(() => {
    const resizeHandler = (): void => {
      setWidth(graphWrapperRef.current?.clientWidth ?? 0);
      setHeight(graphWrapperRef.current?.clientHeight ?? 0);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <Box
      sx={{
        height: "60%",
        border: "1px solid",
        borderRadius: 4,
        borderColor: "#e8e9e8",
        position: "relative",
        mb: 3,
      }}
      ref={graphWrapperRef}
    >
      <RechartsGraph width={width} height={height} />
      <ControlPanel />
      <Legend />
    </Box>
  );
}
