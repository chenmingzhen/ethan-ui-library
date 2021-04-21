// @ts-nocheck 
import React from 'react'
import Icon from '@/component/Icon'

// ali图标库
const FontIconfont = Icon('//at.alicdn.com/t/font_550076_uyvw3e8ul8w4gqfr.css')
const SVGIconfont = Icon('//at.alicdn.com/t/font_1725436_8gldxw9bjlu.js')
const style = { marginRight: 20, fontSize: '36px' }

export default function () {
  return (
    <div>
      <FontIconfont style={style}>&#xe64e;</FontIconfont>
      <FontIconfont style={style} name="info" type="info" />
      <SVGIconfont style={style} name="qingtian" />
      <SVGIconfont style={style} name="wanduoyun" />
    </div>
  )
}
