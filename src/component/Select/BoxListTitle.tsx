import { selectClass } from '@/styles'
import React from 'react'
import { BoxListTitleProps } from './type'

const BoxListTitle: React.FC<BoxListTitleProps> = function (props) {
    const { title } = props

    return <div className={selectClass('group option')}>{title}</div>
}

export default React.memo(BoxListTitle)
