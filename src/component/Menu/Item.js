import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { getKey, getUidStr } from '@/utils/uid'
import { menuClass } from '@/styles'
import { isLink } from '@/utils/is'
import List from './List'
import { consumer } from './context'

class Item extends PureComponent {
  constructor(props) {
    super(props)

    this.id = `${props.path},${getUidStr()}`
    const key = this.getKey(props)
    const [activeUpdate, openUpdate, inPathUpdate] = props.bindItem(
      this.id,
      this.update.bind(this),
      this.updateOpen.bind(this),
      this.updateInPath.bind(this)
    )
    this.state = {
      open: openUpdate(key),
      isActive: activeUpdate(this.id, props.data),
      inPath: inPathUpdate(this.id),
      isHighLight: false,
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleMouseEnter = this.handleToggle.bind(this, true)
    this.handleMouseLeave = this.handleToggle.bind(this, false)
    this.renderLink = this.renderLink.bind(this)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.unbindItem(this.id)
    this.unbindDocumentEvent()
  }

  getKey(props = this.props) {
    return getKey(props.data, props.keygen, props.index)
  }

  bindElement(el) {
    this.element = el
  }

  unbindDocumentEvent() {
    document.removeEventListener('click', this.handleMouseLeave)
  }

  update(check, activePath) {
    const isActive = check(this.id, this.props.data)
    const isHighLight = activePath && isActive ? activePath.indexOf(this.id) > -1 : false

    this.setState({ isActive, isHighLight })
  }

  updateOpen(check) {
    const isOpen = check(this.getKey())
    this.setState({ open: isOpen })
  }

  updateInPath(check) {
    const inPath = check(this.id)
    this.setState({ inPath })
  }

  handleToggle(open) {
    const { toggleOpenKeys, toggleDuration } = this.props
    const key = this.getKey()

    if (this.toggleTimer) clearTimeout(this.toggleTimer)
    if (open) {
      toggleOpenKeys(key, true)
      document.addEventListener('click', this.handleMouseLeave)
    } else {
      this.toggleTimer = setTimeout(() => {
        toggleOpenKeys(key, false)
      }, toggleDuration)
      this.unbindDocumentEvent()
    }
  }

  handleClick(e) {
    const { data, onClick, mode, toggleOpenKeys } = this.props
    if (data.disabled) return

    if (mode === 'inline' && data.children && data.children.length) {
      toggleOpenKeys(this.getKey(), !this.state.open)
    }

    if (typeof data.onClick === 'function') {
      data.onClick(this.id, data)
    } else if (
      (!data.children || data.children.length === 0 || data.onClick === true) &&
      typeof onClick === 'function'
    ) {
      onClick(this.id, data)
    }
    const isLeaf = ((data || {}).children || []).length === 0
    if (!isLeaf) e.nativeEvent.stopImmediatePropagation()
  }

  handleItemClick(clickMethod, e) {
    clickMethod()
    this.handleClick(e)
  }

  handleSwitch(e) {
    const { renderItem, data } = this.props
    const item = renderItem(data)
    if (item.props && item.props.onClick) {
      this.handleItemClick(item.props.onClick, e)
    } else {
      this.handleClick(e)
    }
  }

  renderLink(data) {
    const { linkKey } = this.props
    if (!linkKey) return null
    if (typeof linkKey === 'function') return linkKey(data)
    return data[linkKey]
  }

  render() {
    const {
      data,
      renderItem,
      mode,
      keygen,
      level,
      onClick,
      inlineIndent,
      disabled,
      toggleOpenKeys,
      bottomLine,
      topLine,
      linkKey,
      toggleDuration,
    } = this.props
    const { open, isActive, isHighLight, inPath } = this.state
    const { children: dChildren } = data
    const children = dChildren || []

    const isDisabled = typeof disabled === 'function' ? disabled(data) : disabled

    let isUp = false
    if (mode === 'vertical-auto' && this.element) {
      isUp = this.element.getBoundingClientRect().bottom - topLine > (bottomLine - topLine) / 2
    }

    const className = menuClass(
      'item',
      isDisabled === true && 'disabled',
      children.length > 0 ? 'has-children' : 'no-children',
      isActive && 'active',
      open && 'open',
      isUp && 'open-up',
      isHighLight && 'highlight',
      inPath && 'in-path'
    )

    const style = {}
    const events = {}
    if (mode === 'inline') {
      style.paddingLeft = 20 + level * inlineIndent
    } else {
      events.onMouseEnter = this.handleMouseEnter
      events.onMouseLeave = this.handleMouseLeave
    }
    let item = renderItem(data)
    const link = this.renderLink(data)
    if (isLink(item)) {
      const mergeClass = classnames(menuClass('title'), item.props && item.props.className)
      const mergeStyle = Object.assign({}, style, item.props && item.props.style)
      item = cloneElement(item, { className: mergeClass, style: mergeStyle, onClick: this.handleSwitch })
    } else {
      const props = {
        className: menuClass('title'),
        style,
        onClick: this.handleClick,
      }
      if (link) props.href = link
      item = <a {...props}>{item}</a>
    }

    return (
      <li className={className} {...events} ref={this.bindElement}>
        {item}
        {children.length > 0 && (
          <List
            // className={menuClass('sub')}
            data={children}
            disabled={disabled}
            renderItem={renderItem}
            keygen={keygen}
            inlineIndent={mode === 'horizontal' ? 0 : inlineIndent}
            mode={mode === 'horizontal' ? 'inline' : mode}
            onClick={onClick}
            path={this.id}
            level={level + 1}
            open={open}
            toggleOpenKeys={toggleOpenKeys}
            linkKey={linkKey}
            toggleDuration={toggleDuration}
          />
        )}
      </li>
    )
  }
}

Item.propTypes = {
  bindItem: PropTypes.func,
  bottomLine: PropTypes.number,
  topLine: PropTypes.number,
  data: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  index: PropTypes.number,
  inlineIndent: PropTypes.number,
  level: PropTypes.number,
  keygen: PropTypes.any,
  mode: PropTypes.string,
  onClick: PropTypes.func,
  path: PropTypes.string,
  renderItem: PropTypes.func,
  toggleOpenKeys: PropTypes.func,
  unbindItem: PropTypes.func,
  linkKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  toggleDuration: PropTypes.number,
}

export default consumer(Item)
