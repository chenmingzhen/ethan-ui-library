/**
 * cn - 图片组
 *    -- 一组图片可以放在 Image.Group 中
 * en - Group
 *    -- A group of images can be placed in the Image.Group .
 */
import React from 'react'
import { Image } from 'ethan-ui'

export default function() {
    return (
        <Image.Group>
            {[1, 2, 3, 4].map(i => (
                <Image
                    key={i}
                    width={80}
                    height={80}
                    fit="fill"
                    shape="thumbnail"
                    src={`https://chenmingzhen.github.io/ethan-ui-library/images/${i}_s.jpg`}
                    href={`https://chenmingzhen.github.io/ethan-ui-library/images/${i}_s.jpg`}
                />
            ))}
        </Image.Group>
    )
}