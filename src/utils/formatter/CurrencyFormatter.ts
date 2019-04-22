export const CurrencyFormatter = (value: number, symbol: string): string => {
  return `${symbol} ${value.toLocaleString()}`;
}
