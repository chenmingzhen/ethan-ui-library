import { cascaderClass } from '@/styles'
import classnames from 'classnames'
import React from 'react'
import Popover from '../Popover/Popover'
import { CascaderMoreProps } from './type'

const More: React.FC<CascaderMoreProps> = function (props) {
    const { dataId, itemNodes, showNum } = props

    const className = cascaderClass('item', 'item-compressed')

    const popoverCls = cascaderClass('popover')

    const popoverContentCls = cascaderClass('result')

    /** 重置状态或不显示的状态，重置状态时获取所有的Item重新计算 */
    if (showNum < 0 || showNum > itemNodes.length) {
        return (
            <>
                {itemNodes}

                {/* getResetMore中计算(+Number)宽度使用 */}
                <a
                    key="ethan-cascader-item-placeholder"
                    className={classnames(className, cascaderClass('item-placeholder'))}
                >
                    <span>+</span>
                </a>
            </>
        )
    }

    const beforeNumNodes = new Array(showNum).fill(null).map((_, index) => itemNodes[index])
    const afterNumNodes = new Array(itemNodes.length - showNum).fill(null).map((_, index) => itemNodes[showNum + index])

    const coverPopoverProps = {
        onClick(e: React.MouseEvent<HTMLDivElement>) {
            const target = e.target as HTMLElement

            if (!target.classList.contains(cascaderClass('item'))) {
                e.stopPropagation()
            }
        },
        'data-id': dataId,
    }

    return (
        <>
            {beforeNumNodes}

            <Popover
                className={popoverCls}
                content={<div className={popoverContentCls}>{afterNumNodes}</div>}
                arrowProps={{ ...coverPopoverProps }}
                innerProps={{ ...coverPopoverProps }}
            >
                <a className={className}>+{afterNumNodes.length}</a>
            </Popover>
        </>
    )
}

export default React.memo(More)
