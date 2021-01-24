import React from 'react'
import Icon from '@/component/Icon'
import Rate from '../index'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function() {
  return (
    <>
      <div>
        <StarRate max={10} defaultValue={3} />
      </div>
      <div>
        <StarRate size={14} />
        <br />
        <StarRate size={20} />
        <br />
        <StarRate size={40} />
      </div>
      <div>
        <StarRate value={3.6} disabled />
      </div>
    </>
  )
}
