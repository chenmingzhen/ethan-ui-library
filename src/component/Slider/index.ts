import React from 'react'
import inputable from '../Form/inputable'
import Container from './Container'
import { SliderContainerProps } from './type'

const Slider = inputable(Container) as React.ComponentClass<SliderContainerProps, void>

export default Slider
