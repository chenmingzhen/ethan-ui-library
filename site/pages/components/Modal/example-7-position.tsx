/**
 * cn - 位置（抽屉）
 *    -- 通过 position 可设置 Modal 弹出的位置，这时 Modal 就如 Drawer 一样。现支持 top、right、bottom 和 left 四个位置配置。
 * en - Position
 *    -- Set position property to specify the pop-up position.
 */
import React, { useState } from 'react'
import { Modal, Button, Select } from 'ethan-ui'

export default function () {
    const [visible, updateVisible] = useState(false)

    const [position, updatePosition] = useState<'top' | 'right' | 'bottom' | 'left'>('right')

    function toggle(newVisible: boolean) {
        updateVisible(newVisible)
    }

    return (
        <div>
            <Select
                data={['top', 'right', 'bottom', 'left']}
                value={position}
                style={{ width: 100, marginRight: 12 }}
                onChange={updatePosition}
            />
            <Button onClick={toggle.bind(this, true)}>click me</Button>
            <Modal
                visible={visible}
                title="Form"
                key={position}
                position={position}
                onClose={toggle.bind(this, false)}
                footer={
                    <div>
                        <Button onClick={toggle.bind(this, false)}>Cancel</Button>
                    </div>
                }
            >
                <div>Util Form Finish</div>
            </Modal>
        </div>
    )
}
