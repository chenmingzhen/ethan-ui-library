import { has3d, getTransformName } from './detect'

let use3d

export function setTranslate(el, x, y) {
  const tn = getTransformName()
  el.style[tn] = `translate(${x},${y})`
}

export function setTranslate3D(el, x, y) {
  if (use3d === undefined) use3d = has3d()
  const tn = getTransformName()
  if (use3d) {
    el.style[tn] = `translate3d(${x},${y},0)`
  } else {
    el.style[tn] = `translate(${x},${y})`
  }
}
