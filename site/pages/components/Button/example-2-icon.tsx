/**
 * cn - 图标
 *    -- shineout 并不提供内置的图标, 所以需要图标可以在内容中自行加入
 * en - Icon
 *    -- shineout does not provide built-in icons, you can add it to the content by yourself.
 */
import React from 'react'
import { Button } from 'ethan-ui'
import { Icon } from 'ethan-ui'

const { FontAwesome } = Icon

export default function () {
    return (
        <div>
            <Button type="primary">
                <FontAwesome name="home" style={{ marginRight: 4 }} />
                left
            </Button>
            <Button type="primary">
                right
                <FontAwesome name="home" style={{ marginLeft: 4 }} />
            </Button>
            <Button type="primary">
                ce
                <FontAwesome name="home" style={{ margin: '0 4px' }} />
                ter
            </Button>
        </div>
    )
}
