import React from 'react'
import Icon from '@/component/Icon'
import Rate from '../index'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')

const heartBg = <FontAwesome name="heart-o" />
const heart = <FontAwesome name="heart" style={{ color: '#ff4d4f' }} />
const HeartRate = Rate(heartBg, heart)

export default function() {
  return <HeartRate defaultValue={2} />
}
