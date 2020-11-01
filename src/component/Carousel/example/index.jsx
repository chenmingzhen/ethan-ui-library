import React from 'react'
import Carousel from '@/component/Carousel'
import classnames from 'classnames'
import './custom.less'

const duration = 5000
const containerStyle = {
  fontSize: 40,
  color: '#fff',
  display: 'flex',
  margin: 'auto',
}

const items = ['E', 'T', 'H', 'A', 'N']

function indicatorSwitch(current, moveTo) {
  return (
    <div className="indicator">
      {items.map((item, index) => {
        const isActive = current === index
        const itemClassname = classnames('indicator-item', isActive && 'active')
        const animationStyle = isActive ? { animation: `indicator-rise ${duration / 5000}s linear` } : {}
        return (
          <div key={item} onClick={() => moveTo(index)} className={itemClassname}>
            <span>{item}</span>
            <div className="indicator-progress">
              <div className="fg" style={animationStyle} />
              <div className="bg" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function (props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Carousel
        style={{ width: 500, height: 300 }}
        interval={5000}
        animation="slide"
        indicatorPosition="center"
        indicatorType={indicatorSwitch}
      >
        <div style={{ background: '#666', display: 'flex' }}>
          <div style={containerStyle}>Page 1</div>
        </div>
        <div style={{ background: '#fa8c16', display: 'flex' }}>
          <div style={containerStyle}>Page 2</div>
        </div>
        <div style={{ background: '#eb2f96', display: 'flex' }}>
          <div style={containerStyle}>Page 3</div>
        </div>
        <div style={{ background: '#0074ff', display: 'flex' }}>
          <div style={containerStyle}>Page 4</div>
        </div>
        <div style={{ background: '#ff4d4f', display: 'flex' }}>
          <div style={containerStyle}>Page 5</div>
        </div>
      </Carousel>
    </div>
  )
}
