import React from 'react'
import Rate from './Rate'
import withControl from '../../hoc/withControl'
import { RateProps, RateState } from './type'

const RateComponent = withControl(Rate) as React.ComponentClass<RateProps, RateState>

export default RateComponent
