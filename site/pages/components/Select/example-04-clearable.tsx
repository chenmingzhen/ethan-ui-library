/**
 * cn - 可清空
 *    -- clearable 属性为 true 时，hover 后会显示清空图标。
 * en - Clearable
 *    -- Set the clearable property to true, the clear icon will be displayed on hover.
 */
import React, { useEffect } from 'react'
import { Select } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
    useEffect(() => {
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.textContent = `
            ${data.map((color) => `.result-class-name-${color}{color:${color} !important;}`).join('\n')}
        `
        document.head.appendChild(style)

        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return (
        <div id="select-clearable">
            <Select style={{ width: 240, marginBottom: 12 }} clearable data={data} placeholder="Select color" />
            <br />
            <Select
                style={{ width: 300 }}
                data={data}
                clearable
                multiple
                placeholder="Multiple select"
                resultClassName={(value) => `result-class-name-${value}`}
            />
        </div>
    )
}
