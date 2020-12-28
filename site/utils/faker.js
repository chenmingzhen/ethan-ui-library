export function pickNumber(max = 65555, min = 0, fixed = 2) {
  if (typeof max === 'string') max = parseInt(max, 10)
  if (typeof min === 'string') min = parseInt(min, 10)

  const num = Math.random() * (max - min) + min
  return parseFloat(num.toFixed(fixed), 0)
}
