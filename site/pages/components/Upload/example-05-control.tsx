/**
 * cn - 受控
 *    -- 传入value使Upload受控
 * en - Control
 *    -- Pass value props control Upload fileList

 */
import React, { useState } from 'react'
import { Upload } from 'ethan-ui'
import { action } from 'doc/config'
import { EthanFile } from '@/component/Upload/type'

export default () => {
    const [fileList, updateFileList] = useState<EthanFile[]>([
        {
            id: 'test',
            status: 'MANUAL',
            name: 'imag test',
            data: 'https://img.alicdn.com/bao/uploaded/i4/54458674/O1CN01sIQvPX2Dwk8PBXBx2_!!54458674.png_60x60.jpg',
        },
    ])

    return (
        <Upload.Image
            action={action}
            accept="image/*"
            name="file"
            value={fileList}
            onChange={(v) => {
                updateFileList(v)
            }}
            limit={3}
            style={{ width: 300 }}
        />
    )
}
