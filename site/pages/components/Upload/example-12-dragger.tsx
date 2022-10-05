/**
 * cn - 拖拽上传
 *    -- 设置 drop 来支持拖拽上传
 * en - Drag and Drop
 *    -- set drop to Drag files to upload.
 */
import React from 'react'
import { Upload, Button, FontAwesome } from 'ethan-ui'
import { action } from 'doc/config'

export default function() {
    return (
        <div>
            <Upload.Image action={action} accept="image/*" name="file" limit={3} width={250} drop>
                <div style={{ textAlign: 'center', width: '100%', padding: 20 }}>
                    <FontAwesome style={{ color: '#409dfd', fontSize: 20 }} name="image" />
                    <br />
                    Click or Drag image to upload
                </div>
            </Upload.Image>
            <br />
            <Upload action={action} multiple name="file" limit={3} style={{ width: 300 }} drop>
                <Button>
                    <FontAwesome name="file" />
                    &nbsp; Drop file to upload
                </Button>
            </Upload>
        </div>
    )
}
