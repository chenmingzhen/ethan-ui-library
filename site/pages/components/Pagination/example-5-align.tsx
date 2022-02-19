/**
 * cn - 位置
 *    -- 内置了 3 种位置，left, center, right，默认为 left
 * en - Alignment
 *    -- Options: 'left', 'center', 'right', the default value is left.
 */
import React from 'react'
import { Pagination } from 'ethan/index'

const info = ({ total }) => `Total ${total}`

export default function() {
    return (
        <div>
            <Pagination align="center" total={100} layouts={['links', info]} />
            <br />
            <Pagination align="right" total={100} layouts={[info, 'links']} />
        </div>
    )
}
