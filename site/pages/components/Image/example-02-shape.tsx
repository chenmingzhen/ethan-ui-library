/**
 * cn - 形状
 *    -- 内置了三种图片样式，rounded, cricle, thumbnail
 * en - Shape
 *    -- There are three built-in styles, rounded, cricle, thumbnail.
 */
import React from 'react'
import { Image } from 'ethan-ui'

export default function () {
    return (
        <div>
            <Image
                width={150}
                height={150}
                src="https://chenmingzhen.github.io/ethan-ui-library/images/1_b.jpg"
                shape="rounded"
                title="rounded"
            />
            <Image
                width={150}
                height={150}
                src="https://chenmingzhen.github.io/ethan-ui-library/images/1_b.jpg"
                shape="circle"
                title="circle"
            />
            <Image
                width={150}
                height={150}
                src="https://chenmingzhen.github.io/ethan-ui-library/images/1_b.jpg"
                shape="thumbnail"
                title="thumbnail"
            />
        </div>
    )
}
