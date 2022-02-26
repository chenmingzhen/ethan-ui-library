/**
 * cn - 幻灯片
 *    -- 打开图片幻灯片
 * en - Slider
 *    -- Open photo slider.
 */
import React from 'react'
import { Button, PhotoView } from '@/index'
import photo1 from 'doc/images/1_b.jpg'
import photo2 from 'doc/images/1_s.jpg'
import photo3 from 'doc/images/2_b.jpg'
import photo4 from 'doc/images/2_s.jpg'
import photo5 from 'doc/images/3_b.jpg'
import photo6 from 'doc/images/3_s.jpg'
import photo7 from 'doc/images/4_b.jpg'

const photoImages = [photo1, photo2, photo3, photo4, photo5, photo6, photo7]

export default () => {
    const [visivle, setVisible] = React.useState(false)

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(!visivle)
                }}
            >
                Open PhotoSlider
            </Button>

            <PhotoView.PhotoSlider
                images={photoImages.map(src => ({ src, key: src }))}
                visible={visivle}
                onClose={() => {
                    setVisible(false)
                }}
            />
        </div>
    )
}
