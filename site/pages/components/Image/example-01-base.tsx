/**
 * cn - 基本用法
 *    -- 图片设置宽高后即使图片未加载，仍然会先占位
 * en - Base
 *    -- The most basic image.
 */
import React from 'react'
import { Image } from 'ethan/index'
import img from '../../../images/1_b.jpg'

export default function() {
    return <Image width={200} height={125} src={img} />
}
