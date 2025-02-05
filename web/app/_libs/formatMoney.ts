export default function formatMoney(value: number) {
  const result = (value / 100)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+,)/g, '$1.')

  return `R$ ${result}`
}
