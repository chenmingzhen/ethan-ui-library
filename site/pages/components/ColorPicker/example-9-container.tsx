/**
 * cn - 渲染到指定容器中
 *    -- 默认情况下是渲染在 trigger dom 中，可以使用 getPopupContainer渲染到指定位置
 * en - Container
 *    -- The default is to render in the trigger dom. You can use getPopupContainer to render to the specified location
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
            <ColorPicker defaultValue={randomColor()} position="left-bottom" style={{ margin: '0 10px' }} />

            <ColorPicker defaultValue={randomColor()} position="left-top" style={{ margin: '0 10px' }} />

            <ColorPicker defaultValue={randomColor()} position="right-bottom" style={{ margin: '0 10px' }} />

            <ColorPicker defaultValue={randomColor()} position="right-top" style={{ margin: '0 10px' }} />

            <p style={{ margin: '20px 0' }} />

            <ColorPicker
                defaultValue={randomColor()}
                position="left-bottom"
                getPopupContainer={() => document.body}
                style={{ margin: '0 10px' }}
            />

            <ColorPicker
                defaultValue={randomColor()}
                position="left-top"
                getPopupContainer={() => document.body}
                style={{ margin: '0 10px' }}
            />

            <ColorPicker
                defaultValue={randomColor()}
                position="right-bottom"
                getPopupContainer={() => document.body}
                style={{ margin: '0 10px' }}
            />

            <ColorPicker
                defaultValue={randomColor()}
                position="right-top"
                getPopupContainer={() => document.body}
                style={{ margin: '0 10px' }}
            />

            <p style={{ margin: '20px 0' }} />

            <div id="popup-target" style={{ height: 200, overflow: 'auto', position: 'relative' }}>
                <p style={{ marginTop: 200 }} />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="left-bottom"
                    style={{ margin: '0 500px' }}
                    getPopupContainer={() => document.getElementById('popup-target')}
                />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="left-top"
                    style={{ margin: '0 500px' }}
                    getPopupContainer={() => document.getElementById('popup-target')}
                />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="right-bottom"
                    style={{ margin: '0 500px' }}
                    getPopupContainer={() => document.getElementById('popup-target')}
                />

                <ColorPicker
                    defaultValue={randomColor()}
                    position="right-top"
                    style={{ margin: '0 500px' }}
                    getPopupContainer={() => document.getElementById('popup-target')}
                />
            </div>
        </div>
    )
}
