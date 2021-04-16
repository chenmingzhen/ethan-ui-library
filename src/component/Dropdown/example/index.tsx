import React from 'react'
import Dropdown from '@/component/Dropdown'

const data = [
  {
    content: 'Submenu',
    children: [
      {
        content: 'Link to Google',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
      },
      {
        content: 'next',
        children: [
          {
            content: 'next-item',
          },
        ],
      },
    ],
  },
  <a href="/">Home</a>,
  {
    content: 'Message',
  },
]

export default function () {
  return <Dropdown placeholder="Dropdown" data={data} />
}
