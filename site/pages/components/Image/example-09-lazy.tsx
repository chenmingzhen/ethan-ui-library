/**
 * cn - 延迟加载
 *    -- lazy 属性为 true 时，图片会在进入屏幕可视区域后加载, 默认以 document 的滚动条为判断
 * en - Lazy load
 *    -- When the lazy property is true, the image will load when it enter the visual area of the screen.
 */
import React from 'react'
import { Image } from 'ethan-ui'

export default function () {
    return (
        <div>
            {[1, 2, 3, 4].map((i) => (
                <Image
                    lazy
                    key={i}
                    height="66%"
                    src={`https://chenmingzhen.github.io/ethan-ui-library/images/${i}_b.jpg`}
                />
            ))}
        </div>
    )
}
