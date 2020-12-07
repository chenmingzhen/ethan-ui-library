import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import { curry } from '@/utils/func'
import { deepGet } from '@/utils/objects'
import { isObject, isArray } from '@/utils/is'
import convert from '@/utils/Rule/convert'
import { RULE_TYPE } from '@/utils/Rule'

const context = createReactContext()

const isRule = rules => {
  if (!isObject(rules)) return false
  return rules.$$type === RULE_TYPE
}

export const { Provider } = context
export const { Consumer } = context

export const formProvider = Origin => {
  class FormProvider extends PureComponent {
    constructor(props) {
      super(props)
      this.combineRules = this.combineRules.bind(this)
      // this.groupValidate = this.groupValidate.bind(this)
    }

    getRuleFromString(str) {
      const { rule } = this.props

      if (!isRule(rule)) {
        console.error(new Error('Form rule is missed or is not a Rule instance.'))
        return []
      }

      if (!str) return []
      return convert(rule, str)
    }

    combineRules(name, propRules) {
      const { rules } = this.props

      let newRules = []

      if (isObject(rules) && name) {
        newRules = deepGet(rules, name) || []
      } else if (isArray(rules)) {
        newRules = rules
      }

      if (typeof propRules === 'string') {
        newRules = newRules.concat(this.getRulesFromString(propRules))
      } else if (isArray(propRules)) {
        newRules = newRules.concat(propRules)
      }

      return newRules
    }

    render() {
      const { datum, labelAlign, labelWidth, disabled, pending, mode } = this.props
      const value = {
        formDatum: datum,
        formMode: mode,
        disabled: disabled || pending,
        labelAlign,
        labelWidth,
        combineRules: this.combineRules,
        groupValidate: this.groupValidate,
      }

      return (
        <Provider value={value}>
          <Origin {...this.props} />
        </Provider>
      )
    }
  }

  FormProvider.propTypes = {
    datum: PropTypes.object,
    disabled: PropTypes.bool,
    labelAlign: PropTypes.string,
    labelWidth: PropTypes.any,
    mode: PropTypes.string,
    pending: PropTypes.bool,
    rule: PropTypes.object,
    rules: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  }

  return FormProvider
}

export const formConsumer = curry((keys, Origin, props) => {
  const filterProps = value => {
    const cps = {}
    if (!value) return cps
    if (!keys) return value

    keys.forEach(k => {
      const val = value[k]
      if (val !== undefined) cps[k] = val
    })
    return cps
  }

  return <Consumer>{value => <Origin {...filterProps(value)} {...props} />}</Consumer>
})
