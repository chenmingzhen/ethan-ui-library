/**
 * cn - 渲染到指定容器中
 *    -- 使用 getPopupContainer渲染到指定位置
 * en - Container
 *    -- You can use getPopupContainer to render to the specified location
 */

import React from 'react'
import { ColorPicker } from 'ethan-ui'

function randomColor() {
    const arr = []

    for (let j = 0; j < 3; j++) {
        arr.push(Math.floor(Math.random() * 255))
    }

    return `rgb(${arr.join(',')})`
}

export default function () {
    return (
        <div>
            <div id="popup-target" style={{ height: 200, overflow: 'auto', position: 'relative' }}>
                <p style={{ marginTop: 200 }} />

                <p>Render to trigger element</p>

                <ColorPicker
                    defaultValue={randomColor()}
                    position="left-bottom"
                    style={{ margin: '0 400px' }}
                    getPopupContainer={(triggerElement) => triggerElement}
                />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="left-top"
                    style={{ margin: '0 400px' }}
                    getPopupContainer={(triggerElement) => triggerElement}
                />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="right-bottom"
                    style={{ margin: '0 400px' }}
                    getPopupContainer={(triggerElement) => triggerElement}
                />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="right-top"
                    style={{ margin: '0 400px' }}
                    getPopupContainer={(triggerElement) => triggerElement}
                />

                <p>Render to popup target</p>

                <ColorPicker
                    defaultValue={randomColor()}
                    position="left-bottom"
                    style={{ margin: '0 400px' }}
                    getPopupContainer={() => document.getElementById('popup-target')}
                />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="left-top"
                    style={{ margin: '0 400px' }}
                    getPopupContainer={() => document.getElementById('popup-target')}
                />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="right-bottom"
                    style={{ margin: '0 400px' }}
                    getPopupContainer={() => document.getElementById('popup-target')}
                />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="right-top"
                    style={{ margin: '0 400px' }}
                    getPopupContainer={() => document.getElementById('popup-target')}
                />
            </div>
        </div>
    )
}
