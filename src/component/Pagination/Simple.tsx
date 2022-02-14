import React from 'react'
import { paginationClass } from '@/styles'
import Jumper from './Jumper'
import Prev from './Prev'
import Next from './Next'

const Simple: React.FC = () => (
    <div className={paginationClass('links', 'section')}>
        <Prev isSimple />
        <Jumper size="small" isSimple />
        <Next isSimple />
    </div>
)

export default React.memo(Simple)
