/**
 * cn - 自定义上传
 *    -- 通过 request 函数，替代默认上传方法
 * en - Custom Request
 *    -- Set request property to use your own XMLHttpRequest.
 */
import React from 'react'
import { Upload, Button, Icon } from 'ethan-ui'
import { action } from 'doc/config'

const request = (options) => {
    const { file, onLoad, onProgress } = options
    const xhr = new XMLHttpRequest()
    xhr.open('post', action)

    const data = new FormData()
    data.append('file', file)
    xhr.upload.onprogress = onProgress
    xhr.onload = () => onLoad(xhr)
    xhr.send(data)

    return xhr
}

export default function () {
    return (
        <Upload accept="image/*" limit={3} style={{ width: 300 }} request={request}>
            <Button>
                <Icon.FontAwesome name="cloud-upload" /> Upload file
            </Button>
        </Upload>
    )
}
