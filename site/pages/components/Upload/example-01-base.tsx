/**
 * cn - 基本用法
 *    -- 基础的文件上传
 * en - Base
 *    -- Basic usage for uploading file.

 */
import React from 'react'
import { Upload, Button, FontAwesome } from 'ethan/index'

export default () => (
    <Upload
        action="/upload/"
        accept="image/*"
        name="file"
        onChange={v => {
            console.log(v)
        }}
        limit={3}
        style={{ width: 300 }}
    >
        <Button>
            <FontAwesome name="cloud-upload " style={{ marginRight: 4 }} />
            Upload file
        </Button>
    </Upload>
)
