/**
 * cn - 自定义内容
 *    -- 默认展示的结果为File的name, 如果有需求需要, 可以用 renderContent 自行处理
 * en - Custom content
 *    -- The result of the default display is the name of file. If there is a need, you can use the renderContent to handle it yourself.

 */
import React from 'react'
import { Upload, Button, FontAwesome, Message } from 'ethan-ui'
import { action } from 'doc/config'

export default function() {
    return (
        <>
            <Upload
                action={action}
                accept="image/*"
                name="file"
                renderContent={f => <span style={{ fontSize: '16px' }}>{f.name}</span>}
                limit={3}
                style={{ width: 300, marginBottom: 30 }}
            >
                <Button>
                    <FontAwesome name="cloud-upload " style={{ marginRight: 4 }} />
                    Upload file
                </Button>
            </Upload>

            <Upload.Image
                action="/upload/"
                accept="image/*"
                name="file"
                limit={3}
                renderContent={file => {
                    return (
                        <div onClick={() => Message.info('i am click')}>
                            <img width="100%" src={file.data} alt="not found" />
                        </div>
                    )
                }}
            />
        </>
    )
}
