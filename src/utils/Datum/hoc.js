import React from 'react'
import PropTypes from 'prop-types'
import { curry } from '@/utils/func'
import shallowEqual from '@/utils/shallowEqual'
import { IGNORE_VALIDATE, WITH_OUT_DISPATCH } from './types'
import List from './List'
import Form from './Form'

const types = {
  form: Form,
  list: List,
}

/**
 * Datum的高阶组件容器 通常给Group赋值Datum
 */
export default curry((options, Origin) => {
  const { type = 'list', key = 'value', limit = 0, bindProps = [], ignoreUndefined, pure = true } = options || {}
  const Datum = types[type]
  const Component = pure ? React.PureComponent : React.Component

  return class extends Component {
    static propTypes = {
      onChange: PropTypes.func,
      onDatumBind: PropTypes.func,
      datum: PropTypes.object,
      initValidate: PropTypes.bool,
      value: PropTypes.any,
    }

    static defaultProps = {
      initValidate: false,
    }

    constructor(props) {
      super(props)
      const { datum, onChange, initValidate } = props

      const value = props[key]

      // 判断外部是否传进Datum
      if (datum instanceof Datum) {
        this.datum = datum
      } else {
        // 绑定指定Props
        const ops = bindProps.reduce(
          (o, k) => {
            // o {value,limit,initValidate} k keys
            o[k] = props[k]
            return o
          },
          // 初始值
          { value, limit, initValidate }
        )
        this.datum = new Datum(Object.assign(ops, datum))
      }

      if (onChange) {
        this.datum.onChange = onChange
      }
    }

    componentDidMount() {
      // 记录上一个值
      this.prevValues = this.props[key]
    }

    componentDidUpdate(prevProps) {
      // update datum.onchange
      if (prevProps.onChange !== this.props.onChange) {
        this.datum.onChange = this.props.onChange
      }
      const values = this.props[key]
      if (!shallowEqual(values, this.prevValues)) {
        this.setValue(this.props.initValidate ? undefined : IGNORE_VALIDATE)
        this.prevValues = values
      }
    }

    setValue(t) {
      const values = this.props[key]
      if (ignoreUndefined && values === undefined) return
      this.datum.setValue(values, t)
    }

    render() {
      const { onDatumBind, ...props } = this.props
      if (onDatumBind) onDatumBind(this.datum)
      if (bindProps.includes('disabled')) {
        this.datum.setDisabled(props.disabled)
      }

      if (type === 'list') this.setValue(WITH_OUT_DISPATCH)

      return <Origin {...props} datum={this.datum} />
    }
  }
})
