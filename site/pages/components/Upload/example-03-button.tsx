/**
 * cn - 按钮上传
 *    -- 使用 Upload.Button 展示单个文件的上传进度
 * en - Button
 *    -- Use Upload.Button to show the upload progress of individual files
 */
import React from 'react'
import { Upload } from 'ethan-ui'
import { action } from 'doc/config'

export default function () {
    return <Upload.Button action={action} name="file" loading="正在上传..." placeholder="点击上传" type="primary" />
}
