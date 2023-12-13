import { ActionButton } from "../ActionButton";
import { SkipNext } from "@mui/icons-material";
import { type ButtonBaseProps } from "@mui/material";

type ForwardButtonProps = Pick<ButtonBaseProps, "onClick" | "disabled">;

export function ForwardButton(props: ForwardButtonProps): JSX.Element {
  return (
    <ActionButton {...props}>
      <SkipNext fontSize="inherit" />
    </ActionButton>
  );
}
