/**
 * cn - 基本用法
 *    -- 基本用法
 * en - Base
 *    -- Base
 */
import React from 'react'
import { Swiper } from 'ethan-ui'

const style: React.CSSProperties = {
    background: '#6c98d6',
    lineHeight: '210px',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 700,
    fontSize: '30px',
}

export default () => {
    return (
        <Swiper style={{ height: 210, width: '100%' }}>
            <div style={style}>1</div>
            <div style={style}>2</div>
            <div style={style}>3</div>
        </Swiper>
    )
}
