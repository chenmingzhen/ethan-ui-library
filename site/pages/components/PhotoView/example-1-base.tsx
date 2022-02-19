/**
 * cn - 基本用法
 *    -- 基本的使用
 * en - Base
 *    -- Basic usage
 */
import React from 'react'
import { PhotoView } from '@/index'
import photo1 from 'doc/images/1_b.jpg'
import photo2 from 'doc/images/1_s.jpg'
import photo3 from 'doc/images/2_b.jpg'
import photo4 from 'doc/images/2_s.jpg'
import photo5 from 'doc/images/3_b.jpg'
import photo6 from 'doc/images/3_s.jpg'
import photo7 from 'doc/images/4_b.jpg'

const photoImages = [photo1, photo2, photo3, photo4, photo5, photo6, photo7]

export default () => (
    <PhotoView.Group>
        <div style={{ padding: '40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            {photoImages.map((item, index) => (
                <PhotoView.Photo
                    key={index}
                    src={item}
                    intro={item}
                    imageProps={{
                        width: 100,
                        height: 100,
                        fit: 'fill',
                        style: {
                            marginLeft: '20px',
                            marginBottom: '20px',
                        },
                    }}
                />
            ))}
        </div>
    </PhotoView.Group>
)
