/**
 * cn - 链接
 *    --  可以通过设置 linkKey 来渲染出对应的链接
 * en - link
 *    -- Can render the corresponding link by setting linkKey
 */
import React from 'react'
import { Menu } from 'ethan/index'

const data = [
    {
        key: '1',
        title: 'Google',
        linkKey: 'https://www.google.com',
    },
    {
        key: '2',
        title: 'strackoverflow',
        linkKey: 'https://www.strackoverflow.com',
    },
    {
        key: '3',
        title: 'github',
        linkKey: 'https://www.github.com',
    },
]

export default () => <Menu keygen="id" data={data} style={{ width: 256 }} inlineIndent={24} />
