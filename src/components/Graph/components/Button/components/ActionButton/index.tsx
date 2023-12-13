import { IconButton, type IconButtonProps } from '@mui/material';

export function ActionButton({children, ...restProps}: IconButtonProps): JSX.Element {
  return (
    <IconButton sx={{fontSize: 30}} {...restProps}>
      {children}
    </IconButton>
  )
}