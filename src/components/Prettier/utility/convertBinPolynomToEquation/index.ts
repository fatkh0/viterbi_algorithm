export function convertBinPolynomToEquation(
  binPolynom: string,
  fn: string,
  variable: string
): string {
  const prefix = `${fn}(${variable})=`;
  const result = [];

  if (binPolynom[0] === "1") {
    result.push("1");
  }

  binPolynom
    .slice(1)
    .split("")
    .forEach((t, index) => {
      if (t === "1") {
        if (index === 0) {
          result.push(`${variable}`);
        } else {
          result.push(`${variable}^{${index + 1}}`);
        }
      }
    });

  return `${prefix}${result.join("+")}`;
}
