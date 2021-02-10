import React from 'react'
import lazy from './Lazy'
import navable from '../Navable'

const LazyMarkDown = lazy()
export default LazyMarkDown

export function createMarkDown(loader, noNav) {
  return navable(props => <LazyMarkDown {...props} noNav={noNav} loader={loader} />)
}
