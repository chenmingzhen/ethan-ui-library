/**
 * cn - 受控
 *    -- 可以通过visible使Popover受控
 * en -  Control
 *    -- Use visible to control the show or hidden
 */
import React from 'react'
import { Button, Popover } from 'ethan/index'

export default () => {
    const [visible, updateVisible] = React.useState(true)

    return (
        <div>
            <Popover
                visible={visible}
                style={{ width: 200, padding: 20 }}
                content="some text"
                title="control"
                trigger="click"
                onVisibleChange={updateVisible}
            >
                <Button>Control</Button>
            </Popover>

            <Button
                type="danger"
                onClick={() => {
                    updateVisible(false)
                }}
            >
                Close
            </Button>
        </div>
    )
}
