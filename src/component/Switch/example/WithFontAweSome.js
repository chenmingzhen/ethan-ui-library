import React from 'react'
import Switch from '@/component/Switch/Switch'
import Icon from '@/component/Icon'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')

export default function() {
  return (
    <div>
      <Switch defaultValue content={['开', '关']} />
      <br />
      <Switch content={[<FontAwesome name="btc" />, <FontAwesome name="yen" />]} />
    </div>
  )
}
