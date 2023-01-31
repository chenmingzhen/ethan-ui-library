/**
 * cn - 基本用法
 *    -- 基础的文件上传
 * en - Base
 *    -- Basic usage for uploading file.

 */
import React from 'react'
import { Upload, Button, FontAwesome } from 'ethan-ui'
import { action } from 'doc/config'

export default () => (
    <Upload action={action} accept="image/*" name="file" onChange={console.log} limit={3} style={{ width: 300 }}>
        <Button>
            <FontAwesome name="cloud-upload " style={{ marginRight: 4 }} />
            Upload file
        </Button>
    </Upload>
)
