/**
 * cn - 自定义结果
 *    -- 默认展示的结果和 value 里面所存储的值是一样的, 如果有需求需要, 可以用 renderResult 自行处理
 * en - Custom result
 *    -- The result of the default display is the same as the value stored in the value. If there is a need, you can use the renderResult to handle it yourself.

 */
import React from 'react'
import { Upload, Button, FontAwesome } from 'ethan/index'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
    }
  }

  render() {
    return (
      <Upload
        action="/upload/"
        accept="image/*"
        value={this.state.value}
        name="file"
        renderResult={f => f.name}
        onSuccess={(res, file) => file}
        onChange={v => {
          console.log(v)
          this.setState({ value: v })
        }}
        limit={3}
        style={{ width: 300 }}
      >
        <Button>
          <FontAwesome name="cloud-upload " style={{ marginRight: 4 }} />
          Upload file
        </Button>
      </Upload>
    )
  }
}
