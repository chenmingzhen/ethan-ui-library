/**
 * cn - 基本用法
 *    -- EditableArea 默认展示一行，超过一行的内容用...代替
 * en - Base
 *    -- EditableArea displays one line by default, and more than one line is replaced by ...
 */

import React from 'react'
import { EditableArea } from 'ethan-ui'

export default function () {
    return (
        <EditableArea
            placeholder="input something"
            clearable
            onFocus={() => {
                console.log('focus')
            }}
            onBlur={() => {
                console.log('blur')
            }}
        />
    )
}
