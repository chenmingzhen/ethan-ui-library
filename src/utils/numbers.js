export function range(end, start = 10) {
  const delta = end - start
  if (typeof delta !== "number" || Number.isNaN(delta)) {
    console.error(new Error("end can not computed with start"))
  }
  return Array.from({ length: end - start }, (v, k) => k + start)
}
