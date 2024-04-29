import React from 'react'
import classnames from 'classnames'
import { breadcrumbClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import Popover from '../Popover'
import Caret from '../icons/Caret'
import { BreadcrumbData, BreadcrumbProps } from './type'

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
    const { separator = '/', data = [] } = props
    const className = classnames(breadcrumbClass('_'), props.className)

    const renderItem = useRefMethod((dataItem: BreadcrumbData) => {
        let item = dataItem.title

        if (!React.isValidElement(item)) {
            if (dataItem.onClick || dataItem.url) {
                const newProps: React.DetailedHTMLProps<
                    React.AnchorHTMLAttributes<HTMLAnchorElement>,
                    HTMLAnchorElement
                > = {
                    onClick: dataItem.onClick,
                }

                if (dataItem.url) newProps.href = dataItem.url

                item = (
                    <a {...newProps}>
                        {dataItem.icon}
                        &nbsp;
                        {dataItem.title}
                    </a>
                )
            } else {
                // 普通展示文本
                item = <b>{dataItem.title}</b>
            }
        }

        return props.renderItem?.(dataItem) ?? item
    })

    const renderArray = useRefMethod((arrayData: BreadcrumbData[]) => {
        const first = arrayData[0]

        return (
            <Popover
                placement="bottom"
                className={breadcrumbClass('popover')}
                content={(hide) => (
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
    })

    return (
        <div className={className} style={props.style}>
            {data.map((d, index) => (
                <span key={index}>
                    {Array.isArray(d) ? renderArray(d) : renderItem(d)}
                    {index !== data.length - 1 ? (
                        <span className={breadcrumbClass('separator')}>{separator}</span>
                    ) : null}
                </span>
            ))}
        </div>
    )
}

Breadcrumb.displayName = 'EthanBreadcrumb'

export default React.memo(Breadcrumb)
