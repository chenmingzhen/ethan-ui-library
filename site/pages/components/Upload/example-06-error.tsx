/**
 * cn - 异常处理
 *    -- onError 用来处理上传到服务器返回的异常
 * en - Error
 *    -- Set onError to handle exceptions returned by uploading to the server.
 */
import React from 'react'
import { Upload, Button, FontAwesome } from 'ethan-ui'

export default function () {
    return (
        <div>
            <Upload
                action="/path-no-exist"
                accept="image/*"
                onError={(xhr) => {
                    if (xhr.status === 404) return 'Url not found.'
                    return 'Upload Fail.'
                }}
                limit={3}
                style={{ width: 300, marginBottom: 30 }}
            >
                <Button>
                    <FontAwesome name="cloud-upload" /> Upload file
                </Button>
            </Upload>

            <Upload.Image
                action="/path-no-exist"
                accept="image/*"
                onError={(xhr) => {
                    if (xhr.status === 404) return 'Url not found.'
                    return 'Upload Fail.'
                }}
            />
        </div>
    )
}
