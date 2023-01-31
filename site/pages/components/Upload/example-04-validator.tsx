/**
 * cn - 校验
 *    -- 通过 validator 校验文件
 * en - Validator
 *    -- Set validator to validate the file.
 */
import React from 'react'
import { Upload, FontAwesome, Button } from 'ethan-ui'
import { action } from 'doc/config'

export default function () {
    return (
        <div>
            <Upload
                action={action}
                accept="image/*"
                multiple
                name="file"
                style={{ width: 300, marginBottom: 80 }}
                validator={{
                    size: (s) => (s > 10240 ? new Error('max file size is 10KB') : undefined),
                }}
            >
                <Button>
                    <FontAwesome name="cloud-upload" /> Upload file
                </Button>
            </Upload>

            <Upload.Image
                action="/upload/"
                accept="image/*"
                name="file"
                width={200}
                height={100}
                limit={1}
                style={{ width: 300, marginBottom: 80 }}
                onChange={console.log}
                validator={{
                    imageSize: (img) =>
                        img.width !== 200 || img.height !== 100 ? new Error('only allow 200px * 100px') : undefined,
                    ext: (ext) =>
                        ['jpg', 'png'].includes(ext) ? undefined : new Error('File extension must be jpg or png'),
                }}
            >
                <div style={{ margin: 'auto', color: '#999', textAlign: 'center' }}>
                    <FontAwesome name="cloud-upload " /> Upload Image
                    <br />
                    Allow size 200 * 100
                </div>
            </Upload.Image>

            <Upload.Image
                action="//jsonplaceholder.typicode.com/posts"
                accept="image/*"
                multiple
                name="file"
                validator={{
                    size: (s) => (s > 10240 ? new Error('max file size is 10KB') : undefined),
                }}
            />
        </div>
    )
}
