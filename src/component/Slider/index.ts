import React from 'react'
import withControl from '../../hoc/withControl'
import Container from './Container'
import { SliderContainerProps } from './type'

const Slider = withControl(Container) as React.ComponentClass<SliderContainerProps>

export default Slider
