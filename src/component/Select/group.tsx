// @ts-nocheck 
import React from 'react'
import PropTypes from 'prop-types'
import { getUidStr } from '@/utils/uid'

export default Origin =>
  class extends React.Component {
    static propTypes = {
      data: PropTypes.array,
      groupBy: PropTypes.func,
    }

    static defaultProps = {
      data: [],
    }

    constructor(props) {
      super(props)
      this.state = {
        data: [],
      }
      this.groupByData = this.groupByData.bind(this)
      // groupKey往List Option中传递 判别是否为组名
      this.groupKey = getUidStr()
    }

    componentDidMount() {
      this.groupByData()
    }

    // 数据源更新后 重新分组
    componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) this.groupByData()
    }

    groupByData() {
      const { groupBy, data } = this.props

      if (typeof groupBy !== 'function') {
        this.setState({ data })
        return
      }

      const groupData = {}

      data.forEach((d, i) => {
        const g = groupBy(d, i, data)
        if (!groupData[g]) groupData[g || ''] = g ? [{ [this.groupKey]: g }] : []
        groupData[g].push(d)
      })

      // {"City":[{"kmqcy6mw":"City"},{"value":"Beijing","tag":"1"},{"value":"Shanghai","tag":"1"}],"Country":[{"kmqcy6mw":"Country"},{"value":"China","tag":"2"}],"Other":[{"kmqcy6mw":"Other"},{"value":"Mars","tag":"3"}]}
      // console.log(groupData)

      //  0: {kmqcy6ol: "City"}
      // 1: {value: "Beijing", tag: "1"}
      // 2: {value: "Shanghai", tag: "1"}
      // 3: {kmqcy6ol: "Country"}
      // 4: {value: "China", tag: "2"}
      // 5: {kmqcy6ol: "Other"}
      // 6: {value: "Mars", tag: "3"}
      this.setState({
        data: Object.keys(groupData).reduce((p, v) => (v ? p.concat(groupData[v]) : groupData[v].concat(p)), []),
      })
    }

    render() {
      const { groupBy, data, ...props } = this.props
      return <Origin {...props} data={this.state.data} groupKey={this.groupKey} />
    }
  }
