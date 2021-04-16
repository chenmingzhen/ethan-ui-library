import React, { PureComponent } from 'react'
import Alert from '@/component/Alert'
import Sticky from '@/component/Sticky'

class Demo extends PureComponent {
  componentDidMount() {
    this.element.scrollTop = 400
  }

  render() {
    return (
      <div
        id="sticky_element"
        ref={el => {
          this.element = el
        }}
        style={{ position: 'relative', height: 400, overflow: 'auto' }}
      >
        <div style={{ height: 1600, background: '#f2f2f2' }}>
          <div style={{ height: 600 }}>Some text.</div>
          <Sticky top={0} bottom={0} target="#sticky_element">
            <Alert style={{ marginBottom: 0 }} type="info">
              Sticky to element
            </Alert>
          </Sticky>
        </div>
      </div>
    )
  }
}

export default function() {
  return (
    <>
      <div style={{ height: '1000px' }} />

      <Sticky top={20}>
        <Alert onClose>
          <h3>Some content.</h3>
          Sticky 20px to top.
        </Alert>
      </Sticky>

      <Demo />

      <div style={{ height: '1000px' }} />

      <Sticky bottom={0}>
        <Alert style={{ marginBottom: 0 }} onClose>
          Sticky at bottom.
        </Alert>
      </Sticky>

      <div style={{ height: '1000px' }} />
    </>
  )
}
