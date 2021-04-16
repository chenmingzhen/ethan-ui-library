import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer, { enableMapSet } from 'immer'
import { getKey } from '@/utils/uid'
import { defaultProps, getProps } from '@/utils/proptypes'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { menuClass } from '@/styles'
import { isArray } from '@/utils/is'
import ScrollBar from '../Scroll/Bar'
import List from './List'
import { Provider } from './context'

enableMapSet()

const modeDirection = {
  'vertical-auto': 'y',
  vertical: 'y',
  horizontal: 'x',
}

const getOption = mode =>
  mode.indexOf('vertical') === 0
    ? {
        key: 'height',
        pos: 'Top',
        direction: 'Y',
      }
    : {
        key: 'width',
        pos: 'Left',
        direction: 'X',
      }

// Array To Map
function keyToMap(keys = [], value = true) {
  const keyMap = new Map()
  keys.forEach(v => {
    keyMap.set(v, value)
  })
  return keyMap
}

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // 目前所在的Key
      activeKey: null,
      scrollTop: 0,
      scrollLeft: 0,
      openKeys: keyToMap(props.defaultOpenKeys),
    }

    this.checkOpen = this.checkOpen.bind(this)
    this.checkActive = this.checkActive.bind(this)
    this.checkInPath = this.checkInPath.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleScrollLeft = this.handleScrollX.bind(this, 'Left')
    this.handleScrollTop = this.handleScrollX.bind(this, 'Top')

    this.handleWheel = this.handleWheel.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.bindRootElement = this.bindRootElement.bind(this)
    this.toggleOpenKeys = this.toggleOpenKeys.bind(this)

    // 关于绑定 每次刷新组件的时候，执行updateState，执行updateActive，其中在updateXXX中
    // 对item itemsOpen itemsInPath的绑定进行执行，传递对应的check方法与状态给Item Item通过check方法进行判断 actived inPath
    // 通过Context传递给Item
    this.providerValue = {
      bindItem: this.bindItem.bind(this),
      unbindItem: this.unbindItem.bind(this),
    }

    /**
     * Item中进行绑定
     * @type {{}}
     */
    this.items = {}
    this.itemsOpen = {}
    this.itemsInPath = {}
  }

  componentDidMount() {
    this.updateState()
  }

  componentDidUpdate() {
    this.updateState()
  }

  componentWillUnmount() {
    this.container.removeEventListener('wheel', this.handleWheel)
  }

  getOpenKeys() {
    const { openKeys, defaultOpenKeys } = this.props

    if (openKeys) return openKeys

    // 根据是否已经点击后来判断返回的OpenKeys
    return this.hasToggled ? Array.from(this.state.openKeys.keys()) : defaultOpenKeys
  }

  bindRootElement(el) {
    this.container = el
    if (!el) return
    this.wrapper = el.querySelector(`.${menuClass('wrapper')}`)
    this.rootElement = el.querySelector(`.${menuClass('root')}`)
  }

  /**
   * Item中使用
   * @param id
   * @param updateActive
   * @param updateOpen
   * @param updateInPath
   * @returns {((function(*, *=): (*|boolean))|(function(*=): boolean))[]}
   */
  bindItem(id, updateActive, updateOpen, updateInPath) {
    this.items[id] = updateActive
    this.itemsOpen[id] = updateOpen
    this.itemsInPath[id] = updateInPath

    // Item的初始化State中使用
    return [this.checkActive, this.checkOpen, this.checkInPath]
  }

  unbindItem(id) {
    delete this.items[id]
    delete this.itemsOpen[id]
    delete this.itemsInPath[id]
  }

  /**
   * 是否为激活状态
   * @param id
   * @param data
   * @returns {*|boolean}
   */
  checkActive(id, data) {
    const { active } = this.props
    const act = typeof active === 'function' ? active(data) : id === this.state.activeKey

    if (act) this.state.activeKey = id
    return act
  }

  checkOpen(id) {
    const openKeys = this.getOpenKeys()

    if (isArray(openKeys)) {
      return openKeys.indexOf(id) > -1
    }

    return false
  }

  checkInPath(id) {
    const { activeKey } = this.state

    if (!activeKey || !id) return false
    return activeKey.indexOf(id) >= 0
  }

  updateState() {
    const { mode } = this.props

    this.updateActive()
    this.updateOpen()
    this.updateInPath()

    if (!this.container) return
    const bindMethod = mode !== 'inline' ? this.container.addEventListener : this.container.removeEventListener
    bindMethod.call(this.container, 'wheel', this.handleWheel, { passive: false })
  }

  updateActive() {
    Object.keys(this.items).forEach(id => {
      const update = this.items[id]
      update(this.checkActive, this.state.activeKey)
    })
  }

  updateOpen() {
    const { data, keygen } = this.props

    Object.keys(this.itemsOpen).forEach(id => {
      const update = this.itemsOpen[id]
      update(this.checkOpen)
    })

    const hasOpen = this.getOpenKeys().filter(k => data.find((d, i) => getKey(d, keygen, i) === k)).length > 0

    if (hasOpen !== this.state.hasOpen) {
      this.setState({ hasOpen })
    }
  }

  updateInPath() {
    Object.keys(this.itemsInPath).forEach(id => {
      const update = this.itemsInPath[id]
      update(this.checkInPath)
    })
  }

  /**
   * 设置打开的MenuKeys Item中调用
   * @param id
   * @param open
   */
  toggleOpenKeys(id, open) {
    const newOpenKeys = immer(keyToMap(this.getOpenKeys()), draft => {
      if (open) {
        draft.set(id, true)
      } else draft.delete(id)
    })

    this.hasToggled = true

    const keys = newOpenKeys.keys()
    const { onOpenChange = () => {}, openKeys } = this.props

    // 用户受控
    if (openKeys) {
      onOpenChange(keys)
      return
    }

    this.setState({ openKeys: newOpenKeys, hasOpen: keys.length > 0 })
    onOpenChange(keys)
  }

  handleScrollX(pos, param) {
    const sizeKey = pos === 'Top' ? 'height' : 'width'
    const size = this.container.getBoundingClientRect()[sizeKey]
    const scroll = this.rootElement.getBoundingClientRect()[sizeKey]

    this.wrapper[`scroll${pos}`] = param * (scroll - size)
    this.setState({ [`scroll${pos}`]: param })
  }

  handleWheel(e) {
    const { mode } = this.props
    const { key, pos, direction } = getOption(mode)
    const wheel = normalizeWheel(e)
    const size = this.container.getBoundingClientRect()[key]

    this.wrapper[`scroll${pos}`] += wheel[`pixel${direction}`]
    const precent = this.wrapper[`scroll${pos}`] / size
    this.setState({ [`scroll${pos}`]: precent > 1 ? 1 : precent })

    e.preventDefault()
  }

  handleClick(id, data) {
    const { onClick } = this.props

    // 目前所在的Key
    this.setState({ activeKey: id })

    if (onClick) onClick(data)
  }

  /**
   * 自定义render
   * @param data
   * @returns {null|*}
   */
  renderItem(data) {
    const { renderItem } = this.props

    if (typeof renderItem === 'string') return data[renderItem]
    if (typeof renderItem === 'function') return renderItem(data)

    return null
  }

  renderScrollBar() {
    if (!this.rootElement || !this.container) return null

    const { mode } = this.props
    const direction = modeDirection[mode]

    if (!direction) return null

    if (direction === 'x') {
      const { width } = this.container.getBoundingClientRect()
      const scrollWidth = this.rootElement.getBoundingClientRect().width
      // 内容器未大于外容器 不渲染滚动条
      if (scrollWidth <= width) return null

      return (
        <ScrollBar
          className={menuClass('bar')}
          length={width}
          scrollLength={scrollWidth}
          offset={this.state.scrollLeft}
          onScroll={this.handleScrollLeft}
          direction="x"
        />
      )
    }

    const length = this.container.getBoundingClientRect().height
    const scrollHeight = this.rootElement.getBoundingClientRect().height
    if (scrollHeight < length) return null

    return (
      <ScrollBar
        className={menuClass('bar')}
        forceHeight={length}
        length={length}
        scrollLength={scrollHeight}
        offset={this.state.scrollTop}
        onScroll={this.handleScrollTop}
      />
    )
  }

  render() {
    const { keygen, data, mode, style, theme, inlineIndent, linkKey, disabled, height, toggleDuration } = this.props
    const isVertical = mode.indexOf('vertical') === 0
    const showScroll = ((style.height || height) && isVertical) || mode === 'horizontal'

    const className = classnames(
      menuClass(
        '_',
        isVertical ? 'vertical' : mode,
        theme === 'dark' && 'dark',
        showScroll && 'scroll',
        this.state.hasOpen && 'has-open'
      ),
      this.props.className
    )

    const rootStyle = {}
    if (style.width && mode !== 'horizontal') rootStyle.width = style.width

    let bottomLine = 0
    let topLine = 0
    if (this.container) {
      const rect = this.container.getBoundingClientRect()
      bottomLine = rect.bottom
      topLine = rect.top
    }

    return (
      <div className={className} ref={this.bindRootElement} style={style}>
        <div className={menuClass('wrapper')}>
          <Provider value={this.providerValue}>
            <List
              className={menuClass('root')}
              data={data}
              disabled={disabled}
              inlineIndent={inlineIndent}
              keygen={keygen}
              level={0}
              mode={mode}
              onClick={this.handleClick}
              path=""
              renderItem={this.renderItem}
              open
              style={rootStyle}
              toggleOpenKeys={this.toggleOpenKeys}
              bottomLine={bottomLine}
              topLine={topLine}
              linkKey={linkKey}
              toggleDuration={toggleDuration}
            />
          </Provider>
        </div>

        {showScroll && this.renderScrollBar()}
      </div>
    )
  }
}

Root.propTypes = {
  ...getProps(PropTypes, 'style', 'keygen'),
  active: PropTypes.func, // 验证是否激活,参数为对应的数据对象,返回true则代表该菜单激活
  data: PropTypes.array, // 需要渲染成菜单的数据
  defaultOpenKeys: PropTypes.array, // 初始展开的菜单;如果需要设置此值,则需要设置keygen,此值为一个包含key的数组
  openKeys: PropTypes.array, // 展开的菜单(受控)
  disabled: PropTypes.func,
  inlineIndent: PropTypes.number, // 每一层缩进宽度
  mode: PropTypes.oneOf(['inline', 'vertical', 'horizontal', 'vertical-auto']),
  onClick: PropTypes.func,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onOpenChange: PropTypes.func,
  toggleDuration: PropTypes.number,
}

Root.defaultProps = {
  ...defaultProps,
  data: [],
  disabled: d => d.disabled,
  level: 0,
  keygen: 'id',
  mode: 'inline',
  inlineIndent: 24,
  active: () => false,
  renderItem: 'title',
  defaultOpenKeys: [],
  onClick: () => true,
  toggleDuration: 200,
}

export default Root
