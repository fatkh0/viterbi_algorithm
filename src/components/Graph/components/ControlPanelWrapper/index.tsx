import { Stack, type SxProps } from "@mui/material";
import { type PropsWithChildren } from "react";

const BOX_SHADOW_SX = {
  boxShadow: "0px -4px 15px -4px rgba(34,34,34,0.82)",
  "-webkit-box-shadow": "0px -4px 15px -4px rgba(34,34,34,0.82)",
  "-moz-box-shadow": "0px -4px 15px -4px rgba(34,34,34,0.82)",
} satisfies SxProps;

export function ControlPanelWrapper({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <Stack
      direction="row"
      sx={{
        position: "absolute",
        bgcolor: "#fff",
        p: 1,
        borderRadius: "16px 16px 0 0 ",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        ...BOX_SHADOW_SX,
      }}
    >
      {children}
    </Stack>
  );
}
