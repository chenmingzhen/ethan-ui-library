/**
 * cn - 类型
 *    -- 使用 type 属性来指定标题附带的图标
 * en - type attribute
 *    -- use type display type icon
 */
import React, { useState } from 'react'
import { Modal, Button, Select } from 'ethan-ui'

export default function () {
    const [visible, updateVisible] = useState(false)

    const [type, updateType] = useState<'info' | 'success' | 'warning' | 'error' | 'normal' | 'default' | 'confirm'>(
        'success'
    )

    function handleOk() {
        updateVisible(true)

        console.log('clicked ok!')
    }

    function handleCancel() {
        updateVisible(false)

        console.log('clicked ok!')
    }

    function handleShow() {
        updateVisible(true)
    }

    return (
        <div>
            <Select
                data={['info', 'success', 'warning', 'error']}
                value={type}
                style={{ width: 100, marginRight: 12 }}
                keygen
                onChange={updateType}
            />
            <Button onClick={handleShow}>click me</Button>
            <Modal
                visible={visible}
                type={type}
                width={500}
                title={`Modal Title with ${type} Icon`}
                onClose={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="ok" type="primary" onClick={handleOk}>
                        Ok
                    </Button>,
                ]}
            >
                <span>Modal type: </span>
                <b>{type}</b>
            </Modal>
        </div>
    )
}
