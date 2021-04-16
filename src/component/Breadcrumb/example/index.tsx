import React from 'react'
import { Link, BrowserRouter } from 'react-router-dom'
import Message from '@/component/Message'
import Breadcrumb from '@/component/Breadcrumb'
import Icon from '@/component/Icon'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')

const data = [
  [
    { title: 'Home', url: '#home' },
    { title: 'aaa', url: '#aaa' },
    { title: 'bbb', url: '#bbb' },
  ],
  { title: <Link to="/test">Button</Link> },
  { title: 'Self', onClick: () => Message.show('Clicked self') },
]

function Separator() {
  return <span>~</span>
}

const data2 = [{ title: 'Home', url: '/' }, { title: 'Self' }]

const data3 = [
  { icon: <FontAwesome name="home" />, title: 'Home', url: '#home' },
  { title: 'Menu' },
  { title: 'Self', url: 'https://www.google.com' },
]

export default function() {
  return (
    <BrowserRouter>
      <Breadcrumb data={data} />
      <Breadcrumb data={data} separator="|" />
      <Breadcrumb data={data2} separator={<Separator />} />
      <Breadcrumb data={data3} />
    </BrowserRouter>
  )
}
