/**
 * cn - 工具栏
 *    -- 自定义工具栏
 * en - Toolbar
 *    -- Custom toolbar.
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
    <PhotoView.Group
        toolbarRender={({ rotate, onRotate }) => {
            return (
                <>
                    <svg
                        onClick={() => onRotate(rotate + 90)}
                        width="44"
                        height="44"
                        fill="white"
                        viewBox="0 0 768 768"
                        style={{ padding: 5, opacity: 0.75, cursor: 'pointer' }}
                    >
                        <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
                    </svg>
                </>
            )
        }}
    >
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
