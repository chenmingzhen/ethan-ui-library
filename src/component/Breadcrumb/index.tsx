import React, { useCallback } from 'react'
import classnames from 'classnames'
import { defaultProps } from '@/utils/proptypes'
import { breadcrumbClass } from '@/styles'
import Popover from '../Popover'
import Caret from '../icons/Caret'

export interface BreadcrumbData {
    onClick?(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)

    url?: string

    icon?: React.ReactNode

    title?: React.ReactNode
}

export interface BreadcrumbProps {
    separator?: string

    data: BreadcrumbData[]

    className?: string

    renderItem?(item: BreadcrumbData): React.ReactNode

    style?: React.CSSProperties
}

const Breadcrumb: React.FC<BreadcrumbProps> = props => {
    const { separator, data } = props
    const className = classnames(breadcrumbClass('_'), props.className)

    const renderItem = useCallback(
        (d: BreadcrumbData) => {
            let item = d.title

            if (!React.isValidElement(item)) {
                if (d.onClick || d.url) {
                    const newProps: React.DetailedHTMLProps<
                        React.AnchorHTMLAttributes<HTMLAnchorElement>,
                        HTMLAnchorElement
                    > = {
                        onClick: d.onClick,
                    }

                    if (d.url) newProps.href = d.url

                    item = (
                        <a {...newProps}>
                            {d.icon}
                            &nbsp;
                            {d.title}
                        </a>
                    )
                } else {
                    // 普通展示文本
                    item = <b>{d.title}</b>
                }
            }

            return props.renderItem?.(d) ?? item
        },
        [props.renderItem]
    )

    const renderArray = useCallback(
        (arrayData: BreadcrumbData[]) => {
            const first = arrayData[0]

            return (
                <Popover
                    placement="bottom"
                    className={breadcrumbClass('popover')}
                    content={hide => (
                        <>
                            {arrayData.slice(1).map((d, i) => (
                                <span className={breadcrumbClass('dropdown-item')} key={i} onClick={hide.bind(this)}>
                                    {renderItem(d)}
                                </span>
                            ))}
                        </>
                    )}
                >
                    <span>
                        <span>{renderItem(first)}</span>

                        <span className={breadcrumbClass('down')}>
                            <Caret />
                        </span>
                    </span>
                </Popover>
            )
        },
        [renderItem]
    )

    return (
        <div className={className} style={props.style}>
            {data.map((d, index) => (
                <span key={`__BREADCRUMB__ITEM__${index}`}>
                    {Array.isArray(d) ? renderArray(d) : renderItem(d)}
                    {index !== data.length - 1 ? (
                        <span className={breadcrumbClass('separator')}>{separator}</span>
                    ) : null}
                </span>
            ))}
        </div>
    )
}

Breadcrumb.defaultProps = {
    ...defaultProps,
    data: [],
    separator: '/',
}

Breadcrumb.displayName = 'EthanBreadcrumb'

export default React.memo(Breadcrumb)
