import React from 'react'
import Icon from '@/component/Icon'
import Button from './index'

const FontIconfont = Icon('//at.alicdn.com/t/font_550076_uyvw3e8ul8w4gqfr.css')
const style = { marginRight: 20 }

export default function () {
  return (
    <div>
      {/* normal */}
      <div>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>

      {/* iconfont */}
      <Button type="primary">
        <FontIconfont name="home" style={style} />
        left
      </Button>

      {/* Size */}
      <div>
        <Button size="small">Default</Button>
        <Button size="small" type="primary">
          Primary
        </Button>
        <Button size="small" type="secondary">
          Secondary
        </Button>
        <Button size="small" type="success">
          Success
        </Button>
        <Button size="small" type="warning">
          Warning
        </Button>
        <Button size="small" type="danger">
          Danger
        </Button>
        <Button size="small" type="link">
          Link
        </Button>
      </div>
      <br />
      <div>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
      <br />
      <div>
        <Button size="large">Default</Button>
        <Button size="large" type="primary">
          Primary
        </Button>
        <Button size="large" type="secondary">
          Secondary
        </Button>
        <Button size="large" type="success">
          Success
        </Button>
        <Button size="large" type="warning">
          Warning
        </Button>
        <Button size="large" type="danger">
          <FontIconfont name="home" style={style} />
          danger
        </Button>
        <Button size="large" type="link">
          Link
        </Button>
      </div>

      {/* disable */}
      <div>
        <Button disabled>Default</Button>
        <Button disabled type="primary">
          Primary
        </Button>
        <Button disabled type="secondary">
          Secondary
        </Button>
        <Button disabled type="success">
          Success
        </Button>
        <Button disabled type="warning">
          Warning
        </Button>
        <Button disabled type="danger">
          Danger
        </Button>
        <Button disabled type="link">
          Link
        </Button>
      </div>

      {/* loading */}
      <div>
        <Button loading size="small" type="primary">
          Small
        </Button>
        <Button loading type="primary">
          Default
        </Button>
        <Button loading size="large" type="primary">
          Large
        </Button>
      </div>

      {/* href */}
      <Button href="#home" target="_blank" type="primary">
        Home
      </Button>

      {/* transparent background */}
      <div>
        <Button outline type="primary">
          Primary
        </Button>
        <Button outline type="secondary">
          Secondary
        </Button>
        <Button outline type="success">
          Success
        </Button>
        <Button outline type="warning">
          Warning
        </Button>
        <Button outline type="danger">
          Danger
        </Button>
      </div>

      {/* Once */}
      <Button.Once
        onClick={() => {
          console.log('click once')
        }}
      >
        Button.once
      </Button.Once>

      {/* Group */}
      <Button.Group type="success" size="large" outline>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </Button.Group>

      {/* Group error */}
      <Button.Group type="success" size="large" outline>
        <Button>1</Button>
        <div>this will be not render</div>
        <Button>2</Button>
        <Button>3</Button>
      </Button.Group>
    </div>
  )
}
