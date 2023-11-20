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

export default () => {
    const [data, setData] = React.useState(createData(15))
    const containerRef = useRef<HTMLDivElement>()
    const getResizeTarget = useCallback(() => containerRef.current, [])
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
                ref={containerRef}
            >
                <More
                    data={data}
                    getContainerElement={() => containerRef.current}
                    getMoreElement={() => document.getElementById('rest')}
                    renderItem={(item) => <div style={itemStyle}>{item.label}</div>}
                    renderMore={(items) => (
                        <Popover content={items}>
                            <div id="rest" style={itemStyle}>
                                +{items.length}...
                            </div>
                        </Popover>
                    )}
                />
            </div>
        </div>
    )
}
