/**
 * cn - 基本用法
 *    -- 图片设置宽高后即使图片未加载，仍然会先占位
 * en - Base
 *    -- The most basic image.
 */
import React from 'react'
import { Image } from 'ethan-ui'

export default function () {
    return <Image width={400} height={250} src="https://chenmingzhen.github.io/ethan-ui-library/images/1_b.jpg" />
}
