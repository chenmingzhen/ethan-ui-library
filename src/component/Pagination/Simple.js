import React, { memo } from 'react'
import { paginationClass } from '@/styles'
import Jumper from './Jumper'
import Prev from './Prev'
import Next from './Next'

const Simple = props => (
  <div className={paginationClass('links', 'section')}>
    <Prev {...props} isSimple />
    <Jumper {...props} isSimple size="small" />
    <Next {...props} isSimple />
  </div>
)

export default memo(Simple)
