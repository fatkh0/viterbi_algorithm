export function formatBinSeq(binSeq: string): string {
  return binSeq
    .split("")
    .filter((b) => b !== "," && b !== " ")
    .join("");
}