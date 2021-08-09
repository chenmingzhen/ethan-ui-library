import React from 'react'
import { Popover } from 'ethan/index'

const content = (
    <div>
        <p>明月几时有,把酒问青天!</p>
        <p>明月几时有,把酒问青天!</p>
    </div>
)

export default function() {
    return (
        <Popover title="标题" content={content}>
            <div id="hello">
                <div>1</div>
                <div>2</div>
            </div>
        </Popover>
    )
}
