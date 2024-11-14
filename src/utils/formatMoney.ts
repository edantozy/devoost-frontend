export function formatMoney(num: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
