/**
 * cn - 目录
 *    -- 目录模式
 * en - Directory
 *    -- Use Tree.Directory.
 */
import React from 'react'
import { FontAwesome, Tree } from 'ethan'
import data from 'doc/data/tree'

export default function() {
    return (
        <Tree.Directory
            data={data}
            keygen="id"
            renderItem={(node, isExpanded) => {
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
            }}
            doubleClickExpand
            expandIcons={[
                <FontAwesome name="angle-right" key="angle-right" style={{ fontSize: '16px', color: '#adb5bd' }} />,
                <FontAwesome name="angle-down" key="angle-down" style={{ fontSize: '16px', color: '#adb5bd' }} />,
            ]}
        />
    )
}
