import React from 'react'
import EditableArea from '@/component/EditableArea'

export default function() {
  return (
    <div id="popup-target" style={{ height: 200, overflow: 'auto', position: 'relative', padding: 10 }}>
      <div style={{ height: 100 }} />
      <EditableArea
        bordered
        placeholder="scroll in container"
        getPopupContainer={() => document.querySelector('#popup-target')}
        maxHeight={100}
      />
      <div style={{ height: 140 }} />
    </div>
  )
}
