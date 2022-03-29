/**
 * cn -
 *    -- 此事例演示通过自定义函数压缩文件后上传
 * en -
 *    -- Zip file and upload.
 */
import React from 'react'
import { Upload, Button, FontAwesome, Message } from 'ethan/index'

const request = options => {
    const { file, onLoad, onError, onProgress } = options

    const xhr = new XMLHttpRequest()
    xhr.open('post', '/upload/')

    const zip = new window.JSZip()

    zip.file(file.name, file)

    const id = new Date().getTime()

    zip.generateInternalStream({ type: 'blob' })
        .accumulate(e => {
            Message.loading(`current zipping:${Math.floor(e.percent * 100)}%`, 0, { id })
        })
        .then(content => {
            const zipFile = new File([content], `${file.name}.zip`)

            const data = new FormData()

            data.append('file', zipFile)

            xhr.upload.onprogress = e => {
                onProgress(e)

                Message.loading(`current uploading:${Math.floor((e.loaded / e.total) * 100)}%`, 0, { id })
            }

            xhr.onload = e => {
                onLoad(e.currentTarget)

                Message.success('upload success', 2, { id })
            }

            xhr.onerror = () => {
                onError()

                Message.error('update fail', 2, { id })
            }
            xhr.send(data)
        })

    return xhr
}

export default function() {
    return (
        <Upload limit={3} style={{ width: 300 }} request={request} onChange={console.log}>
            <Button>
                <FontAwesome name="cloud-upload" /> Upload file
            </Button>
        </Upload>
    )
}
