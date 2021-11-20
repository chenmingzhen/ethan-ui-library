import React from 'react'
import { PhotoProvider, PhotoConsumer } from '@/component/PhotoView'

import photo1 from 'doc/images/1_b.jpg'
import photo2 from 'doc/images/1_s.jpg'
import photo3 from 'doc/images/1_b.jpg'
import photo4 from 'doc/images/1_b.jpg'
import photo5 from 'doc/images/1_b.jpg'
import photo6 from 'doc/images/1_b.jpg'
import photo7 from 'doc/images/1_b.jpg'

export const photoImages = [photo1, photo2, photo3, photo4, photo5, photo6, photo7]

export default function() {
    return (
        <PhotoProvider>
            <div style={{ padding: '40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                {photoImages.map((item, index) => (
                    <PhotoConsumer
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
        </PhotoProvider>
    )
}
