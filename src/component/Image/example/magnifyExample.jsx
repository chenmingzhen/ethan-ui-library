import React from 'react'
import Magnify from '../Magnify'

const Example = () => {
  return (
    <Magnify
      maxHeight={500}
      maxWidth={500}
      lockScroll={(status) => {
        console.log(status)
      }}
      position="center"
      src="https://p2.music.126.net/wrhvYn7qGztoXFTKrT8SHA==/109951165114585025.jpg"
    />
  )
}

export default Example
