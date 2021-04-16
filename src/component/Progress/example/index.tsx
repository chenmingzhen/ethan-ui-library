import React from 'react'
import Progress from '@/component/Progress'
import Button from '@/component/Button'

export const Base = () => (
  <div style={{ width: 400 }}>
    <Progress value={50} />
    <br />
    <Progress value={50}>50%</Progress>
  </div>
)

export const Style = () => (
  <div style={{ width: 400 }}>
    <Progress value={100} type="success" />
    <br />
    <Progress value={90} type="info" />
    <br />
    <Progress value={80} type="warning" />
    <br />
    <Progress value={70} type="danger" />
  </div>
)

export const CustomColor = () => (
  <div style={{ width: 400 }}>
    <Progress value={60} color="#531dab" />
    <br />
    <Progress
      value={50}
      color="linear-gradient(45deg, #ffadd2 25%, #eb2f96 25%, #eb2f96 50%, #ffadd2 50%, #ffadd2 75%, #eb2f96 75%, #eb2f96)"
    />
  </div>
)

const blue = '#108ee9'
const green = '#87d068'

export const GradientColor = () => (
  <div style={{ width: 400 }}>
    <Progress
      value={99}
      color={{
        '0%': blue,
        '100%': green,
      }}
    >
      99%
    </Progress>
    <br />
    <Progress
      value={99}
      color={{
        from: green,
        to: blue,
      }}
    >
      99%
    </Progress>
    <br />
    <Progress
      value={99}
      color={{
        '0%': blue,
        '100%': green,
      }}
      shape="circle"
    >
      99%
    </Progress>
  </div>
)

export class Dynamic extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 0 }
  }

  handleClick = (value = this.state.value) => {
    value += Math.random() * 12
    if (value >= 100) {
      value = 100
      this.setState({ value })
    } else {
      this.setState({ value }, () => {
        setTimeout(this.handleClick, 320)
      })
    }
  }

  render() {
    const { value } = this.state

    return (
      <div>
        <Progress style={{ width: 400 }} value={value}>
          <div style={{ width: 50 }}>{value.toFixed(0)}</div>
        </Progress>

        <br />

        <Progress shape="circle" type="success" value={value}>
          {`${value.toFixed(0)}%`}
        </Progress>

        <Button style={{ marginLeft: 80 }} onClick={this.handleClick.bind(this, 0)}>
          Start
        </Button>
      </div>
    )
  }
}

export default function() {
  return (
    <div>
      <Base />
      <Style />
      <CustomColor />
      <GradientColor />
      <Dynamic />
    </div>
  )
}
