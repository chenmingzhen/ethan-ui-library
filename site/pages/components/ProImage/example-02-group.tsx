/**
 * cn - 图片组
 *    -- 一组图片可以通过ProImageGroup进行包裹
 * en - Group
 *    -- A group of images can be wrapped through the ProImageGroup.
 */
import { ProImage } from 'ethan-ui'
import React from 'react'

export default function () {
    return (
        <ProImage.Group>
            <ProImage
                intro="Cloud"
                src="https://chenmingzhen.github.io/ethan-ui-library/images/2_s.jpg"
                fit="cover"
                width={200}
                height={125}
                shape="thumbnail"
            />

            <ProImage
                intro="Paris"
                src="https://chenmingzhen.github.io/ethan-ui-library/images/3_s.jpg"
                fit="cover"
                width={200}
                height={125}
                shape="thumbnail"
            />

            <ProImage
                intro="London"
                src="https://chenmingzhen.github.io/ethan-ui-library/images/4_s.jpg"
                fit="cover"
                width={200}
                height={125}
                shape="thumbnail"
            />
        </ProImage.Group>
    )
}
