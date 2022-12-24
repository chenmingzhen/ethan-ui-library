/**
 * cn - 自定义组件
 *    -- 使用ProImage.Slider控制是否打开图片幻灯片
 * en - Custom component
 *    -- Use ProImage.Slider to control whether to open the image slideshow.
 */
import { Button, Input, Message, ProImage } from 'ethan-ui'
import React, { useEffect, useState } from 'react'

const sources = [
    'https://chenmingzhen.github.io/ethan-ui-library/images/1_b.jpg',
    'https://chenmingzhen.github.io/ethan-ui-library/images/1_s.jpg',
    'https://chenmingzhen.github.io/ethan-ui-library/images/2_s.jpg',
    'https://chenmingzhen.github.io/ethan-ui-library/images/3_s.jpg',
    'https://chenmingzhen.github.io/ethan-ui-library/images/4_s.jpg',
]

export default function () {
    const [visible, updateVisible] = React.useState(false)

    const [currentIndex, updateCurrentIndex] = useState(0)

    useEffect(() => {
        if (visible) {
            const close = Message.info(
                <Button style={{ padding: 0, margin: 0 }} type="link" onClick={() => updateVisible(false)}>
                    Click here to close
                </Button>,
                0
            )

            return close
        }
    }, [visible])

    return (
        <div>
            <Input.Number width={100} value={currentIndex} onChange={updateCurrentIndex} min={0} max={4} />

            <Button type="primary" onClick={() => updateVisible(true)} id="btn" style={{ marginLeft: 5 }}>
                Open
            </Button>

            <ProImage.Slider
                visible={visible}
                onClose={() => updateVisible(false)}
                proImageItems={sources.map((src) => ({
                    src,
                    key: src,
                    getElement: () => document.getElementById('btn'),
                }))}
                currentIndex={currentIndex}
                onIndexChange={updateCurrentIndex}
            />
        </div>
    )
}
