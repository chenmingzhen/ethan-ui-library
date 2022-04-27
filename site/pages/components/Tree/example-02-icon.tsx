/**
 * cn - 图标
 *    -- 在 renderItem 中根据状态展示不同的图标
 * en - Icons
 *    -- Display different icon in the renderItem.
 */
import React from 'react'
import { Tree, FontAwesome } from 'ethan/index'
import data from 'doc/data/tree'

export default function() {
    return (
        <Tree
            data={data}
            keygen="id"
            renderItem="text"
            doubleClickExpand
            expandIcons={[
                <FontAwesome name="angle-right" key="angle-right" style={{ fontSize: '16px', color: '#adb5bd' }} />,
                <FontAwesome name="angle-down" key="angle-down" style={{ fontSize: '16px', color: '#adb5bd' }} />,
            ]}
        />
    )
}
