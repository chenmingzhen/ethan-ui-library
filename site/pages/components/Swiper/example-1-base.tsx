import React from 'react'
import { Swiper } from 'ethan'

export default () => {
    return (
        <div style={{ height: 210, width: 900 }}>
            <Swiper>
                <div style={{ background: '#6c98d6' }}>1</div>
                <div style={{ background: '#6c98d6' }}>2</div>
                <div style={{ background: '#6c98d6' }}>3</div>
            </Swiper>
        </div>
    )
}
