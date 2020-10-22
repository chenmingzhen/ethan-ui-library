export const docSize = {
  get width() {
    return window.innerWidth || document.documentElement.clientWidth
  },
  get height() {
    return window.innerHeight || document.documentElement.clientHeight
  },
}
