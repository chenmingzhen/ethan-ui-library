/**
 * cn -
 *    -- 设置 pile 属性可以把缩略图堆叠展示
 * en -
 *    -- Set the pile property to show the image stack.
 */
import React from 'react'
import { Image } from 'ethan-ui'

export default function() {
    return (
        <Image.Group pile>
            {[1, 2, 3, 4].map(i => (
                <Image
                    key={i}
                    width={80}
                    height={80}
                    fit="fill"
                    shape="thumbnail"
                    src={`https://chenmingzhen.github.io/ethan-ui-library/images/${i}_s.jpg`}
                    href={`https://chenmingzhen.github.io/ethan-ui-library/images/${i}_b.jpg`}
                />
            ))}
        </Image.Group>
    )
}
