/**
 * cn - 更新Message
 *    -- 可以通过唯一的 id 来更新内容
 * en - Update Message
 *    -- Message can be updated with a unique ID
 */
import React from 'react'
import { Button, Message } from 'ethan-ui'

export default () => {
    const id = React.useRef(new Date().getTime()).current

    function handleOpenMessage() {
        Message.loading('Loading...', 0, { id })
    }

    function handleUpdate() {
        Message.success('Success...', 1, { id })
    }

    return (
        <div>
            <Button onClick={handleOpenMessage}>Open Message</Button>

            <Button onClick={handleUpdate}>Update Message</Button>
        </div>
    )
}
