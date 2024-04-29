/**
 * cn - 恢复删除
 *    -- 设置 recoverAble 为 true，点击删除后，文件会标记为已删除，可以通过恢复图标恢复
 * en - Recover
 *    -- Set recoverAble to true, Clicking delete icon will not remove the file, but will mark it as deleted.
 */
import React from 'react'
import { Upload, Button, Icon } from 'ethan-ui'
import { action } from 'doc/config'

export default function () {
    return (
        <div>
            <Upload
                action={action}
                accept="image/*"
                name="file"
                multiple
                limit={2}
                recoverAble
                style={{ width: 300, marginBottom: 30 }}
            >
                <Button>
                    <Icon.FontAwesome name="cloud-upload" /> Upload file
                </Button>
            </Upload>

            <Upload.Image action="/upload/" accept="image/*" multiple limit={1} recoverAble name="file" />
        </div>
    )
}
