/**
 * cn - 图标
 *    -- 在 renderItem 中根据状态展示不同的图标
 * en - Icons
 *    -- Display different icon in the renderItem.
 */
import React from 'react'
import { Tree, FontAwesome } from 'ethan/index'
import data from 'doc/data/tree'

function renderItem(node, isExpanded) {
    let icon
    if (!node.children || node.children.length === 0) {
        icon = <FontAwesome name="file-text-o" />
    } else if (isExpanded) {
        icon = <FontAwesome name="folder-open" style={{ color: '#ffd666' }} />
    } else {
        icon = <FontAwesome name="folder" style={{ color: '#ffd666' }} />
    }

    return (
        <span style={{ fontSize: '16px' }}>
            {icon} {node.text}
        </span>
    )
}

export default function() {
    return (
        <Tree
            data={data}
            keygen="id"
            renderItem={renderItem}
            doubleClickExpand
            line={false}
            expandIcons={[
                <FontAwesome name="angle-right" key="angle-right" style={{ fontSize: '16px', color: '#adb5bd' }} />,
                <FontAwesome name="angle-down" key="angle-down" style={{ fontSize: '16px', color: '#adb5bd' }} />,
            ]}
        />
    )
}
