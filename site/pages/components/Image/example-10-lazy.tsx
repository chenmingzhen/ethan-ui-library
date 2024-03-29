/**
 * cn -
 *    -- 如果需要在特定的元素内部进行懒加载, 则需要提供一个选择器, 请确保 Image 组件渲染的时候能够通过选择器获取到指定元素.
 * en -
 *    -- If you need to lazy loading inside a specific element, you need to provide a selector, please ensure that the Image component can get the specified element through the selector when rendering.
 */
import React from 'react'
import { Image } from 'ethan-ui'

export default function () {
    return (
        <div id="image-container" style={{ height: '300px', overflowY: 'scroll' }}>
            {[1, 2, 3, 4].map((i) => (
                <Image
                    lazy
                    getContainer={() => document.querySelector('#image-container')}
                    key={i}
                    src={`https://chenmingzhen.github.io/ethan-ui-library/images/${i}_b.jpg`}
                />
            ))}
        </div>
    )
}
