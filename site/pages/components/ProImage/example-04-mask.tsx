/**
 * cn - 背景透明度
 *    -- 设置背景和遮罩的透明度
 * en - BackdropOpacity
 *    -- Sets the opacity of the background and mask.
 */
import React from 'react'
import { ProImage } from 'ethan-ui'

export default function () {
    return (
        <ProImage.Group backdropOpacity={0.3}>
            {[1, 2, 3, 4].map((i) => (
                <ProImage
                    key={i}
                    width={200}
                    height={125}
                    fit="cover"
                    shape="thumbnail"
                    intro={`https://chenmingzhen.github.io/ethan-ui-library/images/${i}_s.jpg`}
                    thumbnail={`https://chenmingzhen.github.io/ethan-ui-library/images/${i}_s_t.jpg`}
                    src={`https://chenmingzhen.github.io/ethan-ui-library/images/${i}_s.jpg`}
                />
            ))}
        </ProImage.Group>
    )
}
