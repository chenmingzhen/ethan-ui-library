/**
 * cn - 基本用法
 *    -- 最基本的组件用法。
 * en - Base
 *    -- The basic usage for component.
 */
import React from 'react'
import { Modal, Button } from 'ethan-ui'

export default function() {
    const [visible, setVisible] = React.useState(false)
    const [count, setCount] = React.useState(0)

    function handleOk() {
        setVisible(false)
    }

    function handleClose() {
        setVisible(false)
    }

    function handleShow() {
        setCount(count + 1)
        setVisible(true)
    }

    return (
        <div>
            <Button onClick={handleShow}>click me</Button>
            <Modal
                visible={visible}
                destroyOnClose
                esc
                width={500}
                title="Modal Title"
                onClose={handleClose}
                footer={[
                    <Button key="cancel" onClick={handleClose}>
                        Cancel
                    </Button>,
                    <Button key="ok" type="primary" onClick={handleOk}>
                        Ok
                    </Button>,
                ]}
            >
                {`you are visited ${count}`}
            </Modal>
        </div>
    )
}
