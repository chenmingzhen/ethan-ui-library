import React from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'

interface CardFooterProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    // 对齐方式
    align?: 'center' | 'right'

    className?: string
}

const Footer: React.FC<CardFooterProps> = ({ align, className, ...props }) => (
    <div {...props} className={classnames(cardClass('footer', align), className)} />
)

export default React.memo(Footer)
