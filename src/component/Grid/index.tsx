import React, { Children, cloneElement } from 'react'
import classnames from 'classnames'
import { getGrid } from './util'

export interface GridProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: React.ReactNode

    /** 栅格之间的间距 */
    gutter?: number

    /** 左偏移百分比 */
    offset?: number

    responsive?: 'sm' | 'md' | 'lg' | 'xl'

    stretch?: string

    width?: number
}

const Grid: React.FC<GridProps> = props => {
    const { width = 1, offset, responsive, stretch, children, gutter, ...other } = props

    let autoCount = 0

    let settleWidth = 0

    Children.toArray(children).forEach((child: any) => {
        if (child?.type?.type?.isGrid) {
            if (child.props.width) settleWidth += child.props.width
            else autoCount += 1
        }
    })

    const autoWidth = autoCount > 0 ? (1 - settleWidth) / autoCount : 0

    const className = classnames(props.className, getGrid({ width, offset, responsive }))

    const style = Object.assign({}, props.style)

    if (gutter && gutter > 0) {
        style.width = 'auto'

        style.display = 'block'

        /** 抵消最左最右padding影响 */
        style.marginLeft = `${0 - gutter / 2}px`

        style.marginRight = `${0 - gutter / 2}px`
    }

    return (
        <div {...other} style={style} className={className}>
            {Children.toArray(children).map((child: any) => {
                if (child?.type?.type?.isGrid) {
                    const pps: { style: React.CSSProperties; width?: number } = {
                        style: Object.assign({}, child.props.style),
                    }

                    if (!child.props.width) pps.width = autoWidth

                    if (stretch) pps.style = { ...pps.style, minHeight: '100%', height: '100%' }

                    if (gutter && gutter > 0) {
                        pps.style = { ...pps.style, paddingLeft: gutter / 2, paddingRight: gutter / 2 }
                    }

                    return cloneElement(child, pps)
                }
                return child
            })}
        </div>
    )
}
;(Grid as any).isGrid = true

Grid.displayName = 'EthanGrid'

export default React.memo(Grid)
