import React from 'react'
import Rate from './Rate'
import inputable from '../Form/inputable'
import { RateProps, RateState } from './type'

const RateComponent = inputable(Rate) as React.ComponentClass<RateProps, RateState>

export default RateComponent
