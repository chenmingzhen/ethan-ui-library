import React from 'react'
import Icon from '@/component/Icon'
import Rate from '../index'

const FaceIcon = Icon('https://at.alicdn.com/t/font_662584_hfkafvbgwurkvs4i.css', 'facefont')
const background = <FaceIcon name="question" />
const front = [
  <FaceIcon name="cry" style={{ color: '#003a8c' }} />,
  <FaceIcon name="sad" style={{ color: '#222222' }} />,
  <FaceIcon name="sleeping" style={{ color: '#ffa940' }} />,
  <FaceIcon name="happy" style={{ color: '#fa541c' }} />,
  <FaceIcon name="lol" style={{ color: '#fa541c' }} />,
]
const TextRate = Rate(background, front)

export default function() {
  return <TextRate equal={false} size={40} defaultValue={3} />
}
