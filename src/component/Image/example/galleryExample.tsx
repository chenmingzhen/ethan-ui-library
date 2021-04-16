import React from 'react'
import GalleryExample from '../events'

const example = () => (
  <GalleryExample
    images={[
      'https://p2.music.126.net/wrhvYn7qGztoXFTKrT8SHA==/109951165114585025.jpg',
      'https://p2.music.126.net/wrhvYn7qGztoXFTKrT8SHA==/109951165114585025.jpg',
      'https://p2.music.126.net/wrhvYn7qGztoXFTKrT8SHA==/109951165114585025.jpg',
    ]}
    current={0}
    onClose={(info) => {
      console.log(info)
    }}
  />
)

export default example
