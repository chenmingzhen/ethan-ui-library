import React from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import { CardFooterProps } from './type'

const Footer: React.FC<CardFooterProps> = ({ align, className, ...props }) => (
    <div {...props} className={classnames(cardClass('footer', align), className)} />
)

export default React.memo(Footer)
