/**
 * cn - 基本用法
 *    -- 最基本的组件用法。
 *    -- Modal 会在 document.body 中创建一个新的层显示弹出内容。
 *    -- 关闭 modal 时没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以通过改变 modal 的 key 去实现。
 * en - Base
 *    -- The basic usage for component.
 */
import React from 'react'
import { Modal, Button } from 'ethan/index'

export default function() {
    const [visible, setVisible] = React.useState(false)
    const [count, setCount] = React.useState(0)

    function handleOk() {
        setVisible(false)
    }

    function handleClose() {
        setVisible(false)
    }

    function hadnleShow() {
        setCount(count + 1)
        setVisible(true)
    }

    return (
        <div>
            <Button onClick={hadnleShow}>click me</Button>
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
