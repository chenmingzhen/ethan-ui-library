/**
 * cn - 基本用法
 *    -- 将选项合并显示,容器响应式变化
 * en - Basic
 *    -- The item are displayed in combination, and the container box changes in response.
 */
import More from '@/component/More'
import useResizeSize from '@/hooks/useResizeSize'
import { Input, Popover } from '@/index'
import { range } from '@/utils/numbers'
import React, { useCallback, useRef } from 'react'

function createData(count: number) {
    return range(count).map((_, index) => ({
        value: index,
        label: `Label ${index}`,
    }))
}

const itemStyle: React.CSSProperties = {
    margin: '2px 16px 2px 8px',
    padding: '4px 8px',
    background: 'rgba(255, 0, 0, 0.2)',
    display: 'inline-block',
    width: 65,
    overflow: 'hidden',
}

function renderItem(item, index: number) {
    return (
        <div className="item" style={itemStyle} key={index}>
            {item.label}
        </div>
    )
}

function renderRest(items) {
    return (
        <Popover content={items}>
            <div id="rest" style={itemStyle}>
                +{items.length}...
            </div>
        </Popover>
    )
}

export default () => {
    const [data, setData] = React.useState(createData(10))
    const targetRef = useRef<HTMLDivElement>()
    const getResizeTarget = useCallback(() => targetRef.current, [])
    const { width } = useResizeSize({
        getResizeTarget,
        dirs: ['e'],
    })

    return (
        <div>
            <Input.Number value={data.length} onChange={(num) => setData(createData(num))} min={1} />

            <div
                style={{
                    border: '5px solid green',
                    minWidth: 100,
                    marginTop: 32,
                    width: width || undefined,
                    userSelect: 'none',
                    borderRight: '5px solid #eb9316',
                    /** For drag resize */
                    position: 'relative',
                }}
                ref={targetRef}
            >
                <More
                    compressed
                    data={data}
                    renderItem={renderItem}
                    renderMore={renderRest}
                    getContainerElement={() => targetRef.current}
                    getMoreElement={() => document.getElementById('rest')}
                    getItemDoms={() => targetRef.current.querySelectorAll(`.item`)}
                />
            </div>
        </div>
    )
}
