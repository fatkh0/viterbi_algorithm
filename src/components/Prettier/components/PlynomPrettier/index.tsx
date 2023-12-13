import { Box } from "@mui/material";
import { MathComponent } from "mathjax-react";
import { PrettierWrapper } from "../PrettierWrapper";
import { convertBinPolynomToEquation } from "../../utility";

type PlynomPrettierProps = {
  binPolynoms: string;
};

export function PlynomPrettier({
  binPolynoms,
}: PlynomPrettierProps): JSX.Element {
  const binPolynomsArray = getBinPolynomsArray(binPolynoms);

  const convertedPolynoms = binPolynomsArray.map((binPolynom) => {
    return convertBinPolynomToEquation(binPolynom, "G", "D");
  });

  return (
    <PrettierWrapper>
      <Box sx={{ p: 2 }}>
        {convertedPolynoms.map((polynom, index) => (
          <MathComponent key={index} tex={polynom} />
        ))}
      </Box>
    </PrettierWrapper>
  );
}

function getBinPolynomsArray(binPolynoms: string): string[] {
  return binPolynoms.split(";").filter((t) => !!t.length);
}
