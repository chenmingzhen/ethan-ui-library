/**
 * cn - 受控
 *    -- 传入value使Upload受控
 * en - Control
 *    -- Pass value props control Upload fileList

 */
import React, { useState } from 'react'
import { Upload, Button, FontAwesome } from 'ethan-ui'
import { action } from 'doc/config'

export default () => {
    const [fileList, updateFileList] = useState([])

    return (
        <Upload
            action={action}
            accept="image/*"
            name="file"
            value={fileList}
            onChange={v => {
                console.log(v)

                updateFileList(v)
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
}
