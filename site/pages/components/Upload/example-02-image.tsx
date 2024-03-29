/**
 * cn - 上传图片
 *    -- 使用 Upload.Image 处理带预览的图片上传
 * en - Image
 *    -- Use Upload.Image to upload and preview images.
 */
import React from 'react'
import { Upload } from 'ethan-ui'
import { action } from 'doc/config'

export default function () {
    return <Upload.Image drop action={action} accept="image/*" name="file" limit={3} width={300} height={300} />
}
