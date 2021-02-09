import React, { useState, useRef, useEffect, Fragment, createElement } from 'react'
import PropTypes from 'prop-types'
import { Lazyload, Spin } from 'ethan/index'
import Icon from 'doc/icons/Icon'
import history from 'doc/history'
import { exampleClass } from 'doc/styles'
import CodeBlock from '../CodeBlock'

const placeholder = (
  <div className={exampleClass('placeholder')}>
    <Spin size="54px" name="four-dots" color="#53a0fd" />
  </div>
)

export default function Example({ component, id, name, rawText, title: propsTitle }) {
  const codeblock = useRef(null)
  const [showcode, setShowCode] = useState(false)
  const [com] = useState(createElement(component))
  const [codeHeight, setCodeHeight] = useState()
  let [bottom] = useState()

  // 正则去除文件非代码内容
  const text = rawText.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/, '').trim()

  useEffect(() => {
    if (!codeblock.current) return

    if (showcode) {
      codeblock.current.style.height = `${codeHeight}px`
    } else {
      codeblock.current.style.height = `0`
    }
  }, [showcode])

  const setCodeBlockHeight = height => {
    setCodeHeight(height)
  }

  const toggleCode = isBottom => {
    const showCode = !showcode
    bottom = isBottom
    setShowCode(showCode)
  }

  // isBottom  true 当前为展开模式
  const renderCodeHandle = isBottom => (
    <a className={exampleClass('toggle')} onClick={toggleCode.bind(null, isBottom)}>
      <Icon name={showcode ? 'code-close' : 'code'} />
    </a>
  )

  let { search } = history.location
  const examplePrefix = '?example='
  if (search.indexOf(examplePrefix) === 0) {
    search = search.replace(examplePrefix, '')

    if (name.indexOf(search) < 0) return null
  }

  // eslint-disable-next-line
  let [title, ...sub] = propsTitle.split('\n')
  if (title) title = title.trim()

  return (
    <Fragment>
      {title && (
        <h3 key="0" id={id}>
          {title}
        </h3>
      )}

      <Lazyload placeholder={placeholder}>
        <div className={exampleClass('_', showcode && 'showcode')}>
          {/* 实例组件 */}
          <div className={exampleClass('body')}>{com}</div>
          {propsTitle.length > 0 && (
            <div className={exampleClass('desc')}>
              {sub.map((s, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: s }} />
              ))}
              {renderCodeHandle(false)}
            </div>
          )}
          <div ref={codeblock} className={exampleClass('code')}>
            <CodeBlock onHighLight={setCodeBlockHeight} value={text} />
            {renderCodeHandle(true)}
          </div>
        </div>
      </Lazyload>
    </Fragment>
  )
}

Example.propTypes = {
  component: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  rawText: PropTypes.string,
  title: PropTypes.string.isRequired,
}

Example.defaultProps = {
  rawText: '',
}
