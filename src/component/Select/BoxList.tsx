import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getLocale } from '@/locale'
import { getKey } from '@/utils/uid'
import { selectClass } from '@/styles'
import icons from '../icons'
import List from '../List'
import Spin from '../Spin'
import Input from '../Input'
import Checkbox from '../Checkbox/Checkbox'
import BoxOption from './BoxOption'
import LazyList from '../List/LazyList'

const ScaleList = List(['fade', 'scale-y'], 'fast', 'flex')
const emptyFunc = () => {}

// 多列选项
class BoxList extends Component {
  constructor(props) {
    super(props)

    // fake events
    props.bindOptionFunc('handleHover', emptyFunc)
    props.bindOptionFunc('hoverMove', emptyFunc)
    props.bindOptionFunc('getIndex', emptyFunc)

    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleRenderItem = this.handleRenderItem.bind(this)
  }

  getText(key) {
    return this.props.text[key] || getLocale(key)
  }

  getWidth() {
    // column 单列宽度，仅在 columns 大于 1 时有效
    const { columnWidth, columns } = this.props
    if (columns === -1) return columnWidth
    return columnWidth * columns
  }

  // Header中选择全部
  handleSelectAll(_, checked) {
    const { datum, data } = this.props
    if (checked) datum.add(data)
    else datum.remove(data)
  }

  handleSearch(text) {
    this.props.onFilter(text)
  }

  // 渲染LazyList中的Item项目
  // 数据为renderLazyList分好的每一组
  // [1,2,3]
  handleRenderItem(data, groupIndex) {
    const { datum, keygen, columns, multiple, onChange, renderItem, lineHeight } = this.props
    return (
      <div key={groupIndex} style={{ height: lineHeight }}>
        {data.map((d, i) => {
          const isActive = datum.check(d)
          return (
            <BoxOption
              key={getKey(d, keygen, groupIndex + i)}
              isActive={isActive}
              disabled={datum.disabled(d)}
              data={d}
              columns={columns}
              multiple={multiple}
              onClick={onChange}
              renderItem={renderItem}
            />
          )
        })}
      </div>
    )
  }

  // 暂无使用
  renderFilter() {
    const { filterText } = this.props
    return (
      <Input.Group size="small" className={selectClass('filter-input')}>
        <Input value={filterText} onChange={this.handleSearch} />
        {icons.SEARCH}
      </Input.Group>
    )
  }

  // 渲染头部
  renderHeader(count) {
    const { data, loading, multiple, columnsTitle } = this.props

    // 加载中|非多选 返回空
    if (loading || !multiple) return null

    let checked = 'indeterminate'
    if (count === 0) checked = false
    else if (count === data.length) checked = true

    return (
      <div className={selectClass('header')}>
        {multiple && (
          <Checkbox onChange={this.handleSelectAll} checked={checked}>
            {this.getText('selectAll')}
          </Checkbox>
        )}
        {columnsTitle && <span className={selectClass('header-title')}>{columnsTitle}</span>}
      </div>
    )
  }

  renderLazyList() {
    const { columns, height, lineHeight, data, itemsInView } = this.props

    // 滚动内容总高度
    const scrollHeight = lineHeight * Math.ceil(data.length / columns)

    // 根据列数再次分割数据
    // 如columns=3
    // [[1,2,3],[4,5,6]]
    const sliceData = data.reduce((red, item) => {
      let lastItem = red[red.length - 1]

      if (!lastItem) {
        lastItem = []
        red.push(lastItem)
      }

      if (lastItem.length >= columns) red.push([item])
      else lastItem.push(item)

      return red
    }, [])

    return (
      <LazyList
        scrollHeight={scrollHeight}
        lineHeight={lineHeight}
        data={sliceData}
        itemsInView={itemsInView}
        height={height}
        renderItem={this.handleRenderItem}
      />
    )
  }

  // column -1 渲染堆
  renderStack() {
    const { columns, datum, multiple, onChange, renderItem, data, keygen } = this.props

    return data.map((d, i) => {
      const isActive = datum.check(d)
      return (
        <BoxOption
          key={getKey(d, keygen, i)}
          isActive={isActive}
          disabled={datum.disabled(d)}
          data={d}
          columns={columns}
          multiple={multiple}
          onClick={onChange}
          renderItem={renderItem}
        />
      )
    })
  }

  // 渲染选项
  renderOptions() {
    const { loading, columns, data } = this.props

    if (loading) return null

    // -1堆叠展示
    const stack = columns === -1

    const empty = data.length === 0

    return (
      <div className={selectClass('box-options', stack && 'scrollable')}>
        {empty && (
          <div key="empty" className={selectClass('no-data')}>
            {this.getText('noData')}
          </div>
        )}
        {stack ? this.renderStack() : this.renderLazyList()}
      </div>
    )
  }

  render() {
    const { data, datum, style, loading, focus, selectId, getRef } = this.props

    const checkedCount = data.filter(d => datum.check(d)).length

    const newStyle = Object.assign({}, style, { width: this.getWidth() })

    return (
      <ScaleList
        show={focus}
        onMouseMove={this.handleMouseMove}
        data-id={selectId}
        style={newStyle}
        className={selectClass('box-list')}
        getRef={getRef}
      >
        {loading && typeof loading === 'boolean' ? <Spin size={30} /> : loading}
        {this.renderHeader(checkedCount)}
        {this.renderOptions()}
      </ScaleList>
    )
  }
}

BoxList.propTypes = {
  bindOptionFunc: PropTypes.func.isRequired,
  columnWidth: PropTypes.number,
  columns: PropTypes.number,
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  filterText: PropTypes.string,
  focus: PropTypes.bool,
  keygen: PropTypes.any,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onFilter: PropTypes.func,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  selectId: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.object,
  height: PropTypes.number,
  lineHeight: PropTypes.number,
  itemsInView: PropTypes.number,
  getRef: PropTypes.func,
  columnsTitle: PropTypes.any,
}

BoxList.defaultProps = {
  columnWidth: 160,
}

export default BoxList
