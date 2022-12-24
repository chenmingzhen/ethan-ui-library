/**
 * cn - 基本用法
 *    -- ProImage 显示一张图片。
 * en - Base
 *    -- ProImage Displays a photo.
 */
import React from 'react'
import { ProImage } from 'ethan-ui'

export default function () {
    return (
        <>
            <ProImage
                src="https://chenmingzhen.github.io/ethan-ui-library/images/1_b.jpg"
                fit="cover"
                width={200}
                height={115}
            />
        </>
    )
}
