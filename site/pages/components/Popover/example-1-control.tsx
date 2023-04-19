/**
 * cn - 受控
 *    -- 可以通过visible使Popover受控
 * en -  Control
 *    -- Use visible to control the show or hidden
 */
import React from 'react'
import { Button, Popover } from 'ethan-ui'

export default () => {
    const [visible, updateVisible] = React.useState(false)

    return (
        <div>
            <Popover
                visible={visible}
                style={{ width: 200, padding: 20 }}
                content="some text"
                title="control"
                trigger="mousedown"
                onVisibleChange={(v) => {
                    console.log('onVisibleChange:', v)

                    if (v) {
                        updateVisible(true)
                    }
                }}
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
