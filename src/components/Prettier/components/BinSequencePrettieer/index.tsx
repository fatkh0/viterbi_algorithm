import { MathComponent } from "mathjax-react";
import { PrettierWrapper } from "../PrettierWrapper";
import { convertBinPolynomToEquation } from "../../utility";
import { formatBinSeq } from "../../utility";

type BinSequencePrettieerProps = {
  binSeq: string;
  fn: string;
  variable: string;
};

export function BinSequencePrettieer({
  binSeq,
  fn,
  variable,
}: BinSequencePrettieerProps): JSX.Element {
  const formattedBinSeq = formatBinSeq(binSeq);
  const convertedBinSeq = convertBinPolynomToEquation(
    formattedBinSeq,
    fn,
    variable
  );

  return (
    <PrettierWrapper>
      <MathComponent tex={convertedBinSeq} />
    </PrettierWrapper>
  );
}
