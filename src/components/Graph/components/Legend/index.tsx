import { Box, Stack, Typography } from "@mui/material";

export function Legend(): JSX.Element {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 50,
        bottom: 16,
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Box sx={{ height: 2, width: 100, bgcolor: "#00FF00" }}></Box>
        <Typography>1</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box sx={{ height: 2, width: 100, bgcolor: "#8884d8" }}></Box>
        <Typography>0</Typography>
      </Stack>
    </Box>
  );
}
