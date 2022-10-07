/**
 * cn - 复杂数据
 *    -- 复杂的数据可以使用 format 处理 value
 * en - Complex data
 *    -- Complex data can use format to process value.
 */
import React, { Component } from 'react'
import { Checkbox } from 'ethan-ui'

const data = [
    { id: 1, color: 'red' },
    { id: 2, color: 'orange' },
    { id: 3, color: 'yellow' },
    { id: 4, color: 'green' },
    { id: 5, color: 'cyan' },
    { id: 6, color: 'blue' },
    { id: 7, color: 'violet' },
]

export default class extends Component {
    renderItem = d => {
        const style = { borderBottom: `solid 1px ${d.color}`, paddingBottom: 2 }
        return <span style={style}>{d.color}</span>
    }

    render() {
        return (
            <Checkbox.Group<{ id: number; color: string }, string>
                keygen="id"
                data={data}
                format="color"
                renderItem={this.renderItem}
                defaultValue={['red']}
            />
        )
    }
}