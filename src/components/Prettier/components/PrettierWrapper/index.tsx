import { Box } from "@mui/material";
import { type PropsWithChildren } from "react";

export function PrettierWrapper({ children }: PropsWithChildren): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        bgcolor: "#e8e9e8",
        borderRadius: 2,
        border: '1px solid #fff'
      }}
    >
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}
