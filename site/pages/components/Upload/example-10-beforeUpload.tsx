/**
 * cn - 手动上传
 *    -- beforeUpload返回一个Promise对象，resolve一个status为MANUAL的EthanFile
 * en - Manually upload
 *    -- BeforeUpload return a Promise Object and resolve an EthanFile with MANUAL status
 */
import React from 'react'
import { Upload, Button, FontAwesome } from 'ethan/index'

export default function() {
    return (
        <div>
            <Upload
                name="file"
                limit={3}
                style={{ width: 300 }}
                beforeUpload={() => Promise.resolve({ status: 'MANUAL' })}
                onChange={console.log}
            >
                <Button>
                    <FontAwesome name="cloud-upload " style={{ marginRight: 4 }} />
                    Upload file
                </Button>
            </Upload>
        </div>
    )
}
