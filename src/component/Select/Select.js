import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '@/utils/component'
import { getProps } from '@/utils/proptypes'
import { getUidStr } from '@/utils/uid'
import { selectClass } from '@/styles'
import { getLocale } from '@/locale'
import { isObject } from '@/utils/is'
import { docSize } from '@/utils/dom/document'
import { getParent } from '@/utils/dom/element'
import Result from './Result'
import OptionList from './OptionList'
import OptionTree from './OptionTree'
import BoxList from './BoxList'
import absoluteList from '../List/AbsoluteList'

const WrappedOptionList = absoluteList(OptionList)
const WrappedBoxList = absoluteList(BoxList)
const WrappedOptionTree = absoluteList(OptionTree)

const isResult = el => getParent(el, `.${selectClass('result')}`)

class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      control: 'mouse',
      focus: false,
      position: 'drop-down',
    }

    this.bindElement = this.bindElement.bind(this)
    this.bindOptionFunc = this.bindOptionFunc.bind(this)
    this.setInputReset = this.setInputReset.bind(this)
    this.shouldFocus = this.shouldFocus.bind(this)

    this.handleClick = this.handleClick.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleClear = this.handleClear.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleChange.bind(this, false)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleControlChange = this.handleControlChange.bind(this)
    this.handleClickAway = this.handleClickAway.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)

    this.renderItem = this.renderItem.bind(this)

    // option list not render till first focused
    this.renderPending = true

    this.optionList = {}
    this.selectId = `select_${getUidStr()}`
    // this.closeByResult = false
    this.mouseDown = false

    this.lastResult = undefined
  }

  componentDidUpdate(prevProps, prevState) {
    const { onFilter } = this.props

    // clear filter
    if (prevState.focus !== this.state.focus && !this.state.focus && onFilter) {
      setTimeout(() => {
        onFilter('')
      }, 400)
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.clearClickAway()
  }

  getText(key) {
    return this.props.text[key] || getLocale(key)
  }

  setInputReset(fn) {
    this.inputReset = fn
  }

  // 判断点击的内容是否为Selected容器或容器内
  isDescendent(el, id) {
    if (el.getAttribute('data-id') === id) return true
    if (!el.parentElement) return false

    return this.isDescendent(el.parentElement, id)
  }

  bindOptionFunc(name, fn) {
    this.optionList[name] = fn
  }

  bindElement(el) {
    this.element = el
  }

  bindClickAway() {
    document.addEventListener('click', this.handleClickAway, true)
  }

  clearClickAway() {
    document.removeEventListener('click', this.handleClickAway, true)
  }

  // 点击屏幕事件
  handleClickAway(e) {
    const desc = this.isDescendent(e.target, this.selectId)

    // 点击为外部文档 非Select
    if (!desc) {
      // absolute情况
      if (!getParent(e.target, `[data-id=${this.selectId}]`)) {
        this.blured = true
        this.props.onBlur()
        this.clearClickAway()
        if (this.element) this.element.blur()
      }
      this.handleState(false, null)
    }
  }

  handleClick(e) {
    const { onCreate, onFilter } = this.props
    const plain = !onCreate && !onFilter

    // 点击输入框
    if (plain && isResult(e.target) && this.state.focus) {
      this.handleState(false, e)
      return
    }
    this.handleState(true, e)
  }

  // 设置折叠状态
  handleState(focus, e) {
    if (this.props.disabled === true) return

    if (focus === this.state.focus) return

    // click close icon
    if (focus && e && e.target.classList.contains(selectClass('close'))) return

    const { height, onCollapse } = this.props
    let { position } = this.props
    const windowHeight = docSize.height
    const bottom = height + this.element.getBoundingClientRect().bottom
    if (bottom > windowHeight && !position) position = 'drop-up'

    if (onCollapse) onCollapse(focus)
    this.setState({ focus, position: position || 'drop-down' })

    if (focus) {
      this.blured = false
      this.renderPending = false
    }
  }

  handleControlChange(control) {
    if (control !== this.state.control) this.setState({ control })
  }

  handleChange(_, data, fromInput) {
    const { datum, multiple, disabled, emptyAfterSelect, onFilter, filterText, onCreate } = this.props
    if (disabled === true) return

    // if click option, ignore blur event
    if (this.inputBlurTimer) {
      this.lastChangeIsOptionClick = true
      clearTimeout(this.inputBlurTimer)
    }

    if (multiple) {
      if (isObject(data) && data.IS_NOT_MATCHED_VALUE) {
        datum.remove(data)
      } else {
        const checked = !datum.check(data)
        if (checked) {
          datum.add(data)
        } else {
          if (fromInput === true) return
          datum.remove(data)
        }
        if (this.inputReset) this.inputReset()
      }
    } else {
      datum.set(data)
      this.handleState(false)
      //  let the element focus
      setTimeout(() => {
        if (onCreate && this.blured) return
        if (this.element) this.element.focus()
      }, 10)
    }

    if (emptyAfterSelect && onFilter && filterText) onFilter('')
  }

  shouldFocus(el) {
    if (el.getAttribute('data-id') === this.selectId) return true
    if (getParent(el, `.${selectClass('result')}`)) return true
    return false
  }

  // 聚焦处理
  handleFocus(e) {
    if (!this.shouldFocus(e.target)) return

    this.props.onFocus(e)
    this.bindClickAway()
  }

  handleInputFocus() {
    this.inputLocked = true
    if (this.props.inputable && this.state.control === 'keyboard') {
      if (this.optionList.handleHover) this.optionList.handleHover(0, true)
    }
  }

  // 输入框失焦
  handleInputBlur(text) {
    const { onFilter, onCreate, multiple, filterSingleSelect, data } = this.props
    if (onFilter && text && filterSingleSelect && data.length === 1) {
      this.handleChange(null, data[0], false)
      return
    }
    if (!onCreate) return
    if (multiple && !text) return

    if (this.lastChangeIsOptionClick) return

    // if click option, ignore input blur
    this.inputBlurTimer = setTimeout(() => {
      const retData = onCreate(text)
      this.handleChange(null, retData, true)
    }, 200)
  }

  handleClear() {
    this.props.datum.setValue([])
    this.element.focus()

    if (this.state.focus === false) {
      this.forceUpdate()
    } else {
      this.handleState(false)
    }
  }

  handleEnter() {
    const hoverIndex = this.optionList.getIndex && this.optionList.getIndex()

    const data = this.props.data[hoverIndex]

    if (data && !data[this.props.groupKey]) {
      const checked = !this.props.datum.check(data)
      this.handleChange(checked, data)
      if (this.optionList.handleHover) this.optionList.handleHover(hoverIndex)
    }
  }

  handleKeyDown(e) {
    // just for enter to open the list
    if ((e.keyCode === 13 || e.keyCode === 40) && !this.state.focus) {
      e.preventDefault()
      this.handleClick(e)
      return
    }

    // fot close the list
    if (e.keyCode === 9) {
      this.props.onBlur(e)
      // e.preventDefault()
      if (this.state.focus) this.handleState(false, e)
      else this.clearClickAway()
      return
    }

    // no focus no event
    if (!this.state.focus) return

    this.handleControlChange('keyboard')

    switch (e.keyCode) {
      case 38:
        if (this.optionList.hoverMove) this.optionList.hoverMove(-1)
        e.preventDefault()
        break
      case 40:
        if (this.optionList.hoverMove) this.optionList.hoverMove(1)
        e.preventDefault()
        break
      case 13:
        this.handleEnter()
        e.preventDefault()
        e.stopPropagation()
        break
      default:
        this.lastChangeIsOptionClick = false
    }
  }

  renderItem(data, index) {
    const { renderItem } = this.props
    // 如果为string 使用data的属性
    return typeof renderItem === 'function' ? renderItem(data, index) : data[renderItem]
  }

  renderTree() {
    const { focus, position } = this.state
    const props = {}
    ;[
      'treeData',
      'expanded',
      'onExpand',
      'loader',
      'defaultExpanded',
      'defaultExpandAll',
      'datum',
      'keygen',
      'multiple',
      'text',
      'height',
      'loading',
      'onFilter',
      'filterText',
      'absolute',
      'zIndex',
      'childrenKey',
    ].forEach(k => {
      props[k] = this.props[k]
    })
    props.renderItem = this.renderItem
    return (
      <WrappedOptionTree
        onChange={this.handleChange}
        parentElement={this.element}
        position={position}
        rootClass={selectClass(position)}
        selectId={this.selectId}
        focus={focus}
        renderPending={this.renderPending}
        fixed="min"
        {...props}
      />
    )
  }

  renderList() {
    const { focus, control, position } = this.state
    const { autoAdapt, value } = this.props

    const props = {}
    ;[
      'data',
      'datum',
      'keygen',
      'multiple',
      'columns',
      'columnWidth',
      'columnsTitle',
      'text',
      'itemsInView',
      'absolute',
      'lineHeight',
      'height',
      'loading',
      'onFilter',
      'filterText',
      'zIndex',
      'groupKey',
    ].forEach(k => {
      props[k] = this.props[k]
    })

    const List = props.columns >= 1 || props.columns === -1 ? WrappedBoxList : WrappedOptionList

    return (
      <List
        {...props}
        rootClass={selectClass(position)}
        autoClass={selectClass(autoAdapt && 'auto-adapt')}
        bindOptionFunc={this.bindOptionFunc}
        renderPending={this.renderPending}
        focus={focus}
        control={control}
        selectId={this.selectId}
        onControlChange={this.handleControlChange}
        onChange={this.handleChange}
        renderItem={this.renderItem}
        parentElement={this.element}
        position={position}
        onBlur={this.handleBlur}
        fixed={autoAdapt ? 'min' : true}
        value={value}
      />
    )
  }

  renderOptions() {
    const { treeData } = this.props

    if (treeData) return this.renderTree()

    return this.renderList()
  }

  render() {
    const {
      placeholder,
      multiple,
      clearable,
      disabled,
      size,
      onFilter,
      datum,
      filterText,
      onCreate,
      result,
      compressed,
      trim,
      renderUnmatched,
      showArrow,
      focusSelected,
      compressedClassName,
      resultClassName,
    } = this.props

    const className = selectClass(
      'inner',
      size,
      this.state.focus && 'focus',
      this.state.position,
      multiple && 'multiple',
      disabled === true && 'disabled',
      !trim && 'pre'
    )
    const renderResult = this.props.renderResult || this.renderItem

    return (
      <div
        // eslint-disable-next-line
        tabIndex={disabled === true ? -1 : 0}
        ref={this.bindElement}
        className={className}
        data-id={this.selectId}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <Result
          trim={trim}
          filterText={filterText}
          onClear={clearable ? this.handleClear : undefined}
          onCreate={onCreate}
          onRemove={this.handleRemove}
          onFilter={onFilter}
          datum={datum}
          disabled={disabled}
          focus={this.state.focus}
          result={result}
          multiple={multiple}
          placeholder={placeholder}
          renderResult={renderResult}
          renderUnmatched={renderUnmatched}
          onInputBlur={this.handleInputBlur}
          onInputFocus={this.handleInputFocus}
          setInputReset={this.setInputReset}
          compressed={compressed}
          showArrow={showArrow}
          focusSelected={focusSelected}
          compressedClassName={compressedClassName}
          resultClassName={resultClassName}
        />
        {this.renderOptions()}
      </div>
    )
  }
}

Select.propTypes = {
  ...getProps(PropTypes, 'placeholder', 'keygen'),
  absolute: PropTypes.bool,
  clearable: PropTypes.bool,
  columns: PropTypes.number,
  data: PropTypes.array,
  treeData: PropTypes.array,
  datum: PropTypes.object.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  filterText: PropTypes.string,
  height: PropTypes.number,
  itemsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  multiple: PropTypes.bool,
  onBlur: PropTypes.func,
  onCreate: PropTypes.func,
  onFilter: PropTypes.func,
  onFocus: PropTypes.func,
  position: PropTypes.string,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  result: PropTypes.array,
  size: PropTypes.string,
  text: PropTypes.object,
  compressed: PropTypes.bool,
  trim: PropTypes.bool,
  autoAdapt: PropTypes.bool,
  filterSingleSelect: PropTypes.bool,
  renderUnmatched: PropTypes.func,
  emptyAfterSelect: PropTypes.bool,
  showArrow: PropTypes.bool,
  focusSelected: PropTypes.bool,
  compressedClassName: PropTypes.string,
  onCollapse: PropTypes.func,
  resultClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

Select.defaultProps = {
  clearable: false,
  data: [],
  height: 250,
  itemsInView: 10,
  lineHeight: 34,
  loading: false,
  multiple: false,
  renderItem: e => e,
  text: {},
  compressed: false,
  trim: true,
  autoAdapt: false,
  showArrow: true,
  focusSelected: true,
}

export default Select
