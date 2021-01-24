import React from 'react'
import Icon from '@/component/Icon'
import Rate from '../index'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function() {
  return <StarRate size={24} allowHalf />
}
