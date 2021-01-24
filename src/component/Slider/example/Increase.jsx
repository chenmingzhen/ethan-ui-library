import React from 'react'
import Slider from '@/component/Slider'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scale1: [0, 100],
      scale2: [0, 100],
    }
  }

  render() {
    const { scale1, scale2 } = this.state
    return (
      <div>
        <Slider scale={scale1} defaultValue={50} onIncrease={() => this.setState({ scale1: [0, scale1[1] + 1] })} />
        <Slider
          range
          scale={scale2}
          defaultValue={[20, 50]}
          onIncrease={() => this.setState({ scale2: [0, scale2[1] + 5] })}
        />
      </div>
    )
  }
}
