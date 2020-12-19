import React from 'react'
import Input from '@/component/Input'
import Button from '@/component/Button'
import Icon from '@/component/Icon'
import Rule from '@/component/Rule'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')

const rules = new Rule()

const firstStyle = { width: 120, marginRight: 12 }
const secondStyle = { marginBottom: 12 }
const thirdStyle = { width: 300, marginBottom: 12 }

export default function() {
  return (
    <>
      <Input placeholder="input something" info={value => `当前值为${value}`} />

      <Input clearable placeholder="input something" info={11} />

      <div>
        <Input size="small" style={firstStyle} placeholder="small size" />
        <Input style={firstStyle} placeholder="default size" />
        <Input size="large" style={firstStyle} placeholder="large size" />
      </div>

      <div style={{ width: 300 }}>
        <Input style={secondStyle} type="number" placeholder="digits undefined" />
        <Input style={secondStyle} digits={0} type="number" placeholder="digits 0" />
        <Input style={secondStyle} digits={1} type="number" placeholder="digits 1" />
        <Input style={secondStyle} digits={2} type="number" placeholder="digits 2" />
        <Input style={secondStyle} digits={3} type="number" placeholder="digits 3" />
      </div>
      <Input.Number width={120} min={23} max={100} digits={0} />

      <div>
        <Input.Group style={thirdStyle}>
          <FontAwesome name="user" />
          <Input placeholder="first name" />
          -
          <Input placeholder="last name" />
        </Input.Group>

        <Input.Group style={thirdStyle}>
          <Input placeholder="search text" />
          <FontAwesome name="search" />
        </Input.Group>

        <Input.Group style={thirdStyle}>
          <Input style={{ flex: 1 }} placeholder="flex 1" />
          <Input style={{ flex: 3 }} placeholder="flex 3" />
        </Input.Group>

        <Input.Group style={thirdStyle}>
          <Input placeholder="search text" />
          <Button type="primary">Search</Button>
        </Input.Group>

        <Input.Group size="small" style={thirdStyle}>
          <b>
            <FontAwesome name="envelope" />
          </b>
          <Input placeholder="email" />
          <b>.com</b>
        </Input.Group>
      </div>

      <div style={{ width: 300 }}>
        <Input style={secondStyle} placeholder="email" tip="enter you email." popover="top-left" />

        <Input.Group style={secondStyle} tip="enter you email.">
          <FontAwesome name="envelope" />
          <Input placeholder="email" />
        </Input.Group>

        <Input.Group style={secondStyle}>
          <FontAwesome name="envelope" />
          <Input tip="enter you email." placeholder="email" />
        </Input.Group>
      </div>

      <Input placeholder="email" rules={[rules.required]} tip="Email, required" popover="top-left" width={300} />

      <div>
        <Input.Group disabled style={thirdStyle}>
          <Input placeholder="first name" />
          -
          <Input placeholder="last name" />
        </Input.Group>

        <Input disabled style={thirdStyle} placeholder="disabled input" />
      </div>

      <Input.Password placeholder="input password" />

      <Input
        style={thirdStyle}
        placeholder="disabled input"
        rule={[
          new Rule({
            isOne: {
              func: (value, formData, callback, props) => {
                console.log(value)
              },
            },
          }),
        ]}
      />
    </>
  )
}
