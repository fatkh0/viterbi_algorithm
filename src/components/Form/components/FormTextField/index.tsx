import {
  Box,
  ClickAwayListener,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useState } from "react";
import { BinSequencePrettieer } from "../../../Prettier";
import { formatBinSeq } from "../../../Prettier/utility";

type FormTextFieldProps = {
  controlName: string;
  label: string;
  isReadOnly?: boolean;
  prettierProps?: {
    fn: string;
    variable: string;
  };
  showPrettier?: boolean;
};

export function FormTextField({
  controlName,
  label,
  isReadOnly = false,
  prettierProps,
  showPrettier = true,
}: FormTextFieldProps): JSX.Element {
  const [isPrettierOpen, setIsPrettierOpen] = useState(false);
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  const error = errors[controlName];
  const errorMessage =
    typeof error?.message === "string" ? error.message : undefined;

  const currentValue = getValues(controlName);

  const isEmptyValue =
    !currentValue.length ||
    formatBinSeq(currentValue)
      .split("")
      .every((v) => v === "0");

  return (
    <FormControl fullWidth sx={{ position: "relative" }}>
      <Controller
        control={control}
        name={controlName}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!error}
            helperText={errorMessage}
            sx={{
              "& .MuiFormLabel-root": {
                lineHeight: 1.75,
              },
            }}
            variant="outlined"
            label={label}
            inputProps={{
              readOnly: isReadOnly,
            }}
          />
        )}
      />
      {isEmptyValue || !showPrettier ? null : (
        <DropdownIcon
          onClick={() => setIsPrettierOpen((prev) => !prev)}
          isOpen={isPrettierOpen}
        />
      )}

      {isPrettierOpen && prettierProps && currentValue.length ? (
        <ClickAwayListener onClickAway={() => setIsPrettierOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              zIndex: 10,
              width: "100%",
            }}
          >
            <BinSequencePrettieer
              binSeq={getValues(controlName)}
              {...prettierProps}
            />
          </Box>
        </ClickAwayListener>
      ) : null}
    </FormControl>
  );
}

type DropdownIconProps = {
  onClick: () => void;
  isOpen: boolean;
};

function DropdownIcon({ onClick, isOpen }: DropdownIconProps): JSX.Element {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: "fit",
        cursor: "pointer",
        position: "absolute",
        right: 16,
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
    </IconButton>
  );
}
