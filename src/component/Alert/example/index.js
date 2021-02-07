import React from 'react'
import Alert from '@/component/Alert'

export default () => (
  <>
    <div style={{ marginTop: '100px' }}>
      <Alert.Scroll
        onClose={() => {
          console.log('all close')
        }}
      >
        <Alert type="success" icon>
          Success Type.
        </Alert>
        <Alert type="info" icon>
          Info Type.
        </Alert>
        <Alert type="warning" icon>
          Warning Type.
        </Alert>
        <Alert type="danger" icon>
          Danger Type.
        </Alert>
      </Alert.Scroll>
    </div>
    <div style={{ marginTop: '100px' }}>
      <Alert.Scroll style={{ padding: '20px' }}>
        <Alert icon iconSize={24} type="success">
          <h3>Set iconSize</h3>
          iconSize=24
        </Alert>
        <Alert icon iconSize={24} type="info">
          <h3>Set iconSize</h3>
          iconSize=24
        </Alert>
        <Alert icon iconSize={24} type="warning">
          <h3>Set iconSize</h3>
          iconSize=24
        </Alert>
        <Alert icon iconSize={24} type="danger">
          <h3>Set iconSize</h3>
          iconSize=24
        </Alert>
      </Alert.Scroll>
    </div>
  </>
)
