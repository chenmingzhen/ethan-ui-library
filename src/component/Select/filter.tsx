// @ts-nocheck 
import React from 'react'
import PropTypes from 'prop-types'
import { getKey } from '@/utils/uid'
import { getFilterTree } from '@/utils/tree'
import { IS_NOT_MATCHED_VALUE } from './Result'

export default Origin =>
  class extends React.Component {
    static propTypes = {
      expanded: PropTypes.arrayOf(PropTypes.string),
      data: PropTypes.array,
      treeData: PropTypes.array,
      datum: PropTypes.object,
      filterDelay: PropTypes.number,
      keygen: PropTypes.any,
      onFilter: PropTypes.func,
      onCreate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
      value: PropTypes.any,
      noCache: PropTypes.bool,
      multiple: PropTypes.bool,
      showHitDescendants: PropTypes.bool,
    }

    static defaultProps = {
      data: [],
      filterDelay: 300,
      showHitDescendants: false,
    }

    constructor(props) {
      super(props)
      this.state = {
        // filter方法
        innerFilter: undefined,
        // onCreate产生的值
        innerData: undefined,
        // 过滤的关键字text
        filterText: '',
      }
      this.handleCreate = this.handleCreate.bind(this)
      this.handleFilter = this.handleFilter.bind(this)
      this.getResultByValues = this.getResultByValues.bind(this)

      this.resultCache = new Map()
    }

    componentDidUpdate(prevProps) {
      const { datum, multiple } = this.props

      if (prevProps.multiple !== multiple) {
        datum.limit = multiple ? 0 : 1
      }
    }

    getTreeResult(value, prediction) {
      const { treeData, childrenKey = 'children' } = this.props
      let finded
      const treeNode = children => {
        if (finded) return false
        if (!children || children.length === 0) return false
        for (let i = 0; i < children.length; i++) {
          const d = children[i]
          if (prediction(value, d)) finded = d
          treeNode(d[childrenKey])
        }
        return false
      }
      treeNode(treeData)
      return finded
    }

    getResult(value) {
      const { data, treeData, datum, onCreate } = this.props

      const prediction = datum.prediction || ((v, d) => v === datum.format(d))
      if (treeData) return this.getTreeResult(value, prediction)

      for (let i = 0, count = data.length; i < count; i++) {
        const d = data[i]
        // 利用prediction判断是否相等
        if (prediction(value, d)) return d
      }

      // 无结果 创建新选项
      if (onCreate) return this.handleCreate(value)

      return undefined
    }

    // 获取输入框中的result
    getResultByValues() {
      const { datum, noCache } = this.props
      const { values = [] } = datum

      const result = []
      values.forEach(v => {
        // 是否从缓存中获取
        let res = noCache ? undefined : this.resultCache.get(v)
        if (!res) {
          res = this.getResult(v)

          if (res !== undefined && !noCache) this.resultCache.set(v, res)
          else if (res === undefined) res = { [IS_NOT_MATCHED_VALUE]: true, value: v }
        }
        if (res !== undefined) {
          result.push(res)
        }
      })

      return result
    }

    handleFilter(text) {
      const { filterDelay, onFilter, onCreate } = this.props

      //  onFilter={text => d => d.indexOf(text) >= 0}

      // not filter
      if (!text) {
        this.setState({ filterText: '', innerFilter: undefined, innerData: undefined })

        if (this.timer) clearTimeout(this.timer)
        if (onFilter) onFilter(text)

        return
      }

      if (onCreate) {
        const innerData = this.handleCreate(text)
        this.setState({ innerData })
      }

      if (!onFilter) return

      this.setState({ filterText: text })

      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const fn = onFilter(text)
        if (typeof fn === 'function') {
          this.setState({ innerFilter: fn })
        }
      }, filterDelay)
    }

    // 创建新选项
    handleCreate(text) {
      const { onCreate } = this.props
      const createFn = typeof onCreate === 'boolean' ? t => t : onCreate

      return createFn(text)
    }

    filterTreeData() {
      const { treeData, expanded, showHitDescendants, ...other } = this.props
      const { innerFilter } = this.state
      let filterExpandedKeys = expanded
      let newData = treeData
      if (innerFilter) {
        filterExpandedKeys = []
        newData = getFilterTree(
          treeData,
          innerFilter,
          filterExpandedKeys,
          node => getKey(node, other.keygen),
          other.childrenKey,
          showHitDescendants
        )
      }
      return {
        treeData: newData,
        expanded: filterExpandedKeys,
      }
    }

    // 获取过滤掉的数据
    filterData() {
      const { data, ...other } = this.props
      const { innerFilter, innerData } = this.state
      let newData = data

      // filter方法
      if (innerFilter) newData = data.filter(d => innerFilter(d))

      if (innerData) {
        const newKey = getKey(innerData, other.keygen, innerData)
        newData = [innerData, ...newData.filter(d => getKey(d, other.keygen, d) !== newKey)]
      }

      return {
        data: newData,
      }
    }

    render() {
      const { treeData, onFilter, onCreate, ...other } = this.props
      const { filterText } = this.state
      const filterFn = onFilter || onCreate ? this.handleFilter : undefined
      const dataGenerator = treeData ? this.filterTreeData : this.filterData
      const props = {
        ...other,
        filterText,
        result: this.getResultByValues(),
        inputable: !!onCreate,
        onCreate: onCreate ? this.handleCreate : undefined,
        onFilter: filterFn,
        ...dataGenerator.call(this),
      }

      return <Origin {...props} />
    }
  }
