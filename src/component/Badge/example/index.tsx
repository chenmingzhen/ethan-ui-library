import React from 'react'
import Badge from '@/component/Badge'

export default () => (
  <div style={{ marginTop: '50px' }}>
    <div>
      <Badge count="3">
        <div style={{ width: 50, height: 50, backgroundColor: '#ddd' }} />
      </Badge>
    </div>
    <div>
      <Badge count="10055" maxCount="999" style={{ marginLeft: 60 }}>
        <div style={{ width: 50, height: 50, backgroundColor: '#ddd' }} />
      </Badge>
    </div>
    <div>
      <Badge count="100" maxCount="99" color="orange">
        <div style={{ width: 50, height: 50, backgroundColor: '#ddd' }} />
      </Badge>
      <Badge dot color="green" style={{ marginLeft: 60 }}>
        <div style={{ width: 50, height: 50, backgroundColor: '#ddd' }} />
      </Badge>
    </div>
  </div>
)
