import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  schema,
  FORM_FIELDS,
  INPUT_FORM_FIELDS,
  READONLY_FORM_FIELDS,
} from "./utility";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Stack } from "@mui/material";
import { FormTextField } from "./components/FormTextField";
import { FormType } from "./types";
import { PlynomPrettier } from "../Prettier";
import { useLayoutContext } from "../Layout/components/LayoutProvider";
import { useEffect } from "react";
import { FormButtons } from "./components/FormButtons";
import { useGetCode } from "../../api/hooks/useGetCode";
import { useGetDecode } from "../../api/hooks/useGetDecode";

export function Form(): JSX.Element {
  const { reset, message } = useLayoutContext();
  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      [FORM_FIELDS.message]: "01101",
      [FORM_FIELDS.polynom]: "111;101;",
      [FORM_FIELDS.coddedMessage]: "",
      [FORM_FIELDS.errors]: "",
      [FORM_FIELDS.received]: "",
      [FORM_FIELDS.decodedMessage]: "",
    },
    mode: "onChange",
  });

  const watchedPolynom = useWatch({
    control: methods.control,
    name: "polynom",
  });

  const fetchCoded = useGetCode();
  const fetchDecoded = useGetDecode();

  const onReset = (): void => {
    reset();
    methods.reset();
  };

  const onDecode = async () => {
    const errors = methods.getValues(FORM_FIELDS.errors);

    if (!errors) return;

    const received = await fetchDecoded(errors);

    if (received) {
      methods.setValue(FORM_FIELDS.received, received);
    }
  };

  const onSubmit = async ({ polynom, message }: FormType) => {
    const codedSeq = await fetchCoded(polynom, message);

    if (codedSeq) {
      methods.setValue(FORM_FIELDS.coddedMessage, codedSeq.coded);
      methods.setValue(FORM_FIELDS.errors, codedSeq.errors);
    }
  };

  useEffect(() => {
    methods.setValue(FORM_FIELDS.decodedMessage, message);
  }, [message, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container sx={{ mb: 2 }} spacing={2}>
          {INPUT_FORM_FIELDS.map(({ name, label }, index) => (
            <Grid item xs={12} md={6} key={name}>
              <FormTextField
                controlName={name}
                label={label}
                prettierProps={{
                  fn: "P",
                  variable: "x",
                }}
                showPrettier={name !== FORM_FIELDS.polynom}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack sx={{ width: "100%", height: "100%", gap: 2 }}>
              {READONLY_FORM_FIELDS.map(({ name, label, isReadOnly }) => (
                <Box key={name}>
                  <FormTextField
                    controlName={name}
                    label={label}
                    isReadOnly={isReadOnly}
                    prettierProps={{
                      fn: "F",
                      variable: "x",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <PlynomPrettier binPolynoms={watchedPolynom} />
          </Grid>
        </Grid>
        <FormButtons onReset={onReset} onDecode={onDecode} />
      </form>
    </FormProvider>
  );
}
