/**
 * cn - 指定目标
 *    -- 使用 container 来指定 Modal 渲染的目标节点
 * en - Target
 *    -- set container to render target node
 */
import React, { useRef, useState } from 'react'
import { Modal, Button } from 'ethan-ui'

export default function () {
    const [visible, setVisible] = useState(false)

    const containerRef = useRef<HTMLDivElement>()

    function show() {
        setVisible(true)
    }

    function hide() {
        setVisible(false)
    }

    return (
        <div ref={containerRef}>
            <Button onClick={show}>click me</Button>
            <Modal
                getContainer={() => containerRef.current}
                visible={visible}
                width={500}
                title="Modal Title"
                onClose={hide}
                footer={[
                    <Button key="cancel" onClick={hide}>
                        Cancel
                    </Button>,
                    <Button key="ok" type="primary" onClick={hide}>
                        Ok
                    </Button>,
                ]}
            >
                Modal mount after Button
            </Modal>
        </div>
    )
}
