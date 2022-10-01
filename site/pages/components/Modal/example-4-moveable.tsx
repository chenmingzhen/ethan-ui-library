/**
 * cn - 可移动/伸缩
 *    -- 设置 moveable/resizable 来使 Modal 可以按住头部移动, 设置 resizable 来自由调整 Modal 大小
 * en - Moveable/resizable
 *    -- set moveable/resizable mark modal move of resize by header, set resizable to resize modal
 */
import React from 'react'
import { Modal, Button } from 'ethan-ui'

export default () => {
    const [show, setShow] = React.useState(false)
    return (
        <div>
            <Button onClick={() => setShow(true)}>Moveable modal</Button>
            <Modal
                moveable
                resizable
                visible={show}
                title="Moveable"
                onClose={() => setShow(false)}
                footer={<Button onClick={() => setShow(false)}>Confirm</Button>}
            >
                drag title to move
            </Modal>
        </div>
    )
}
