/**
 * cn - 渲染到指定容器中
 *    -- 默认情况下是渲染在 document body 中，可以使用 getPopupContainer渲染到指定位置
 * en - Container
 *    -- The default is to render in the document body. You can use getPopupContainer to render to the specified location
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

export default function () {
    return (
        <div style={{ height: 300, overflow: 'scroll' }}>
            <div style={{ height: 300 }} />

            <DatePicker placeholder="Select date" style={{ marginLeft: 20 }} />

            <div id="container" style={{ position: 'relative' }}>
                <DatePicker
                    placeholder="Select date"
                    style={{ marginLeft: 20 }}
                    getPopupContainer={() => document.getElementById('container')}
                />
            </div>

            <DatePicker
                placeholder="Select date"
                className="test"
                style={{ marginLeft: 20 }}
                getPopupContainer={(triggerELement) => {
                    console.log('triggerELement:', triggerELement)

                    return triggerELement
                }}
            />
        </div>
    )
}
