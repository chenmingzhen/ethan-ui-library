/**
 * cn - 基本用法
 *    -- 基础的文件上传, onSuccess 的返回值会作为 value 传给 onChange
 * en - Base
 *    -- Basic usage for uploading file, the onSuccess's returns will be the onChange params

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
        onSuccess={(res, file) => file.name}
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
