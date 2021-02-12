import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { uploadClass } from '@/styles'
import { getLocale } from '@/locale'
import Upload from './Upload'
import { ERROR } from './utils/request'

// Upload Image
class Image extends PureComponent {
  constructor(props) {
    super(props)
    this.beforeUpload = this.beforeUpload.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      urlInvalid: false,
    }
    this.timeout = null
  }

  beforeUpload(blob, validatorHandle) {
    return new Promise((resolve, reject) => {
      const { imageSize } = this.props.validator
      const file = {}
      // FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
      // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
      const reader = new FileReader()

      reader.onload = e => {
        const data = e.target.result
        file.data = data

        const image = new window.Image()
        image.onerror = () => {
          this.setState(
            immer(draft => {
              draft.urlInvalid = true
            })
          )
          reject()
        }
        image.onload = () => {
          if (!imageSize) {
            resolve(file)
            return
          }
          const res = imageSize(image)
          if (res instanceof Error) {
            if (!validatorHandle(res, blob)) reject()
            file.status = ERROR
            file.message = res.message
          }
          resolve(file)
        }
        image.src = data
      }

      // FileReader.readAsDataURL()
      // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL
      reader.readAsDataURL(blob)
    })
  }

  handleKeyDown(e) {
    this.setState({ urlInvalid: false })
    if (e.keyCode === 13) e.target.click()
  }

  handleMouseDown() {
    this.setState({ urlInvalid: false })
  }

  render() {
    const { children, width, height, ...others } = this.props
    const { urlInvalid } = this.state
    if (urlInvalid) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.setState({ urlInvalid: false })
      }, 3000)
    }

    const style = { width, height }
    const content = children || <div className={uploadClass('indicator', urlInvalid && 'url-invalid-indicator')} />

    return (
      <Upload {...others} imageStyle={style} beforeUpload={this.beforeUpload}>
        <div
          tabIndex={this.props.disabled ? -1 : 0}
          style={style}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          className={uploadClass(
            'image-plus',
            'image-item',
            others.disabled && 'disabled',
            urlInvalid && 'url-invalid-border'
          )}
        >
          {content}
        </div>
        {urlInvalid && (
          <div style={{ width: '100%', position: 'relative' }}>
            <div className={uploadClass('url-invalid-message')}>{getLocale('urlInvalidMsg')}</div>
          </div>
        )}
      </Upload>
    )
  }
}

Image.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.any,
  height: PropTypes.number,
  recoverAble: PropTypes.bool,
  validator: PropTypes.shape({
    imageSize: PropTypes.func,
    size: PropTypes.func,
  }),
  width: PropTypes.number,
  disabled: PropTypes.bool,
}

Image.defaultProps = {
  accept: 'image/*',
  height: 80,
  validator: {},
  width: 80,
}

export default Image
