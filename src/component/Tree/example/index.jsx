import React from 'react'
import Base from './base'
import Icons from './Icons'
import Click from './click'
import Line from './Line'
import Expanded from './Expanded'
import Disabled from './disabled'
import Drag from './Drag'
import DragStyle from './DragStyle'
import LazyLoad from './LazyLoad'

export default function() {
  return (
    <>
      <Base />
      <Icons />
      <Click />
      <Line />
      <Expanded />
      <Disabled />
      <Drag />
      <DragStyle />
      <LazyLoad />
    </>
  )
}
