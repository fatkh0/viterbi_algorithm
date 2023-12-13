import { Button, Stack } from "@mui/material";

type FormButtonsProps = {
  onReset: () => void;
  onDecode: () => void;
};

export function FormButtons({ onReset, onDecode }: FormButtonsProps): JSX.Element {
  return (
    <Stack sx={{ position: "absolute", bottom: 16, right: 16, gap: 2 }}>
      <Button variant="contained" color="success" type="submit">
        Code
      </Button>
      <Button variant="contained" color="success" onClick={onDecode}>
        Decode
      </Button>
      <Button variant="contained" color="error"  onClick={onReset}>
        Reset
      </Button>
    </Stack>
  );
}
