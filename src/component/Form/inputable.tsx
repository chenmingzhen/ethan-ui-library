import React from 'react'
import immer from 'immer'
import { Component } from '@/utils/component'
import { promiseAll, isSameError } from '@/utils/errors'
import { curry, compose } from '@/utils/func'
import { filterProps } from '@/utils/objects'
import { getUidStr } from '@/utils/uid'
import shallowEqual from '@/utils/shallowEqual'
import { isArray } from '@/utils/is'
import { FORCE_PASS, ERROR_TYPE, IGNORE_VALIDATE, errorSubscribe, IGNORE_BIND } from '@/utils/Datum/types'
import { itemConsumer } from '@/component/Form/Item'
import validate from '@/utils/validate'
import Datum from '@/utils/Datum'
import Form from '@/utils/Datum/Form'
import List from '@/utils/Datum/List'
import { formConsumer } from './formContext'
import { loopConsumer } from './Loop'
import { fieldSetConsumer } from './FieldSet'

interface InputableProps {
    beforeChange: Function

    bind: any[]

    bindInputToItem: Function

    combineRules: Function

    defaultValue: any

    fieldSetValidate: any

    forceChangeOnValueSet: boolean

    formDatum: any

    innerFormNamePath: string

    loopContext: any

    name: string | string[]

    onChange: Function

    onError: Function

    onItemError: Function

    popover: string

    required: boolean

    rules: any[] | string

    type: string

    unbindInputFromItem: Function

    value: any

    scuSkip: string[]
}

interface InputableState {
    error: any

    value: any
}

const types = ['formDatum', 'disabled', 'combineRules']

// formConsumer(types) 先返回一个未执行的方法  compose进行洋葱操作,返回的是一个方法,下面将类传进consumer作为参数
// 从fieldSetConsumer开始 把类放进去，返回一个HocConsumer包裹的组件，再传递给loopConsumer，itemConsumer，
// 最后经过fieldSetConsumer，loopConsumer，itemConsumer包装的组件 传递给formConsumer(types)
// formConsumer(types)得到的是一个柯里化的函数，第一个keys参数已经是types，包装三层包装传递进来的组件是第二个参数Origin 第三个参数是外界传进来的props
// 最终导出一个 inputable的高阶组件
// types 走到formConsumer的keys
const consumer = compose(formConsumer(types), itemConsumer, loopConsumer, fieldSetConsumer)

const tryValue = (val, def) => (val === undefined ? def : val)

const beforeValueChange = curry((fn, value, datum) => {
    if (!fn) return value

    return fn(value, datum) ?? value
})

export default curry(Origin =>
    consumer(
        class extends Component<InputableProps, InputableState> {
            static propTypes = {}

            static defaultProps = {
                rules: [],

                scuSkip: ['onChange', 'rules'],
            }

            itemName = getUidStr()

            lastValue

            datum: Form | List

            customValidate

            updateTimer: NodeJS.Timeout

            constructor(props) {
                super(props)

                const { formDatum, name, defaultValue } = props

                this.state = {
                    error: undefined,

                    value: props.value || defaultValue,
                }

                this.lastValue = formDatum && name ? formDatum.get(name) || {} : {}
            }

            componentDidMount = () => {
                super.componentDidMount()

                const { formDatum, loopContext, name, defaultValue, bindInputToItem, popover } = this.props

                /**
                 * TODO formDatum
                 * 不直接操作state
                 */
                if (formDatum && name) {
                    if (Array.isArray(name)) {
                        const dv = defaultValue || []

                        name.forEach((n, i) => formDatum.bind(n, this.handleUpdate, dv[i], this.validate))

                        this.state.value = name.map(n => formDatum.get(n))
                        formDatum.subscribe(errorSubscribe(this.errorName), this.handleUpdate)
                    } else {
                        formDatum.bind(name, this.handleUpdate, defaultValue, this.validate)
                        this.state.value = formDatum.get(name)
                    }
                }

                if (bindInputToItem && name && !popover) bindInputToItem(this.errorName)

                if (loopContext) loopContext.bind(this.validate)
            }

            shouldComponentUpdate(nextProps, nextState) {
                const isFormDatum = this.props.formDatum && this.props.name

                if (!isFormDatum && !shallowEqual(this.getValue(), nextState.value)) return true

                const skip = [...(this.props.scuSkip || []), 'formDatum', 'loopContext']

                if (isFormDatum) skip.push('value')

                const options = { skip, deep: ['data', 'defaultValue', 'datum', 'name', 'rule', 'style'] }

                /** TODO */
                return !(shallowEqual(nextProps, this.props, options) && shallowEqual(nextState, this.state))
            }

            componentWillUnmount() {
                super.componentWillUnmount()

                const { formDatum, name, loopContext, unbindInputFromItem } = this.props

                /** TODO */
                if (formDatum && name) {
                    formDatum.unbind(name, this.handleUpdate)
                    if (Array.isArray(name)) {
                        formDatum.unsubscribe(errorSubscribe(this.errorName), this.handleUpdate)
                        formDatum.setError(this.errorName)
                    }
                }

                if (unbindInputFromItem && name) unbindInputFromItem(this.errorName)

                if (loopContext) loopContext.unbind(this.validate)
            }

            get errorName() {
                const { name } = this.props

                return Array.isArray(name) ? name.join('|') : name
            }

            /** 从formDatum中获取值或state的获取 */
            getValue = () => {
                const { formDatum, name, value, defaultValue } = this.props

                /** @todo */
                if (formDatum && name) {
                    if (Array.isArray(name)) {
                        const dv = defaultValue || []

                        return name.map((n, i) => tryValue(formDatum.get(n), dv[i]))
                    }

                    return tryValue(formDatum.get(name), defaultValue)
                }

                const hasValue = 'value' in this.props || 'checked' in this.props

                // 非表单控制(前者为非受控值，后者为受控值)
                return !hasValue && !formDatum ? this.state.value : value
            }

            getError = () => {
                const { formDatum, name } = this.props

                if (formDatum && name) {
                    return formDatum.getError(this.errorName)
                }

                return this.state.error
            }

            handleDatumBind = datum => {
                this.datum = datum
            }

            handleError = (error?: any) => {
                const { formDatum, name, onItemError, onError } = this.props

                if (formDatum && name) {
                    if (!isSameError(error, formDatum.getError(this.errorName, true))) {
                        formDatum.setError(this.errorName, error, true)
                    }
                } else {
                    this.setState({ error })
                }

                if (onError) onError(error)

                if (onItemError && !name) onItemError(this.itemName, error)
            }

            validateHook = customValidate => {
                this.customValidate = customValidate
            }

            /** @todo data类型  */
            validate = (value, data?: any, type?: string) => {
                const { name, formDatum, combineRules, bind } = this.props

                const names = Array.isArray(name) ? name : [name]

                const validateResults = []

                const validateProps = filterProps(this.props, v => typeof v === 'string' || typeof v === 'number')

                if (this.datum) {
                    const datumValue =
                        this.datum instanceof Datum.Form ? this.datum.formatValue(value) : this.datum.arrayValue(value)

                    value = this.datum.limit === 1 ? datumValue[0] : datumValue

                    validateProps.type = 'array'
                }

                if (type === FORCE_PASS || value === FORCE_PASS) {
                    this.handleError()

                    return Promise.resolve(true)
                }

                if (value === undefined || Array.isArray(name)) value = this.getValue()

                if (this.customValidate) validateResults.push(this.customValidate())

                /** TODO */
                if (formDatum && bind && type !== IGNORE_BIND) {
                    formDatum.validateFields(bind, IGNORE_BIND).catch(() => {})
                }

                if (!data && formDatum) data = formDatum.getValue()

                /** @todo 不应该直接操作rules */
                let { rules } = this.props

                names.forEach((n, i) => {
                    // 如果为非表单 则names为[undefined]
                    if (formDatum && combineRules) {
                        rules = combineRules(n, rules)
                    }

                    if (isArray(rules) && rules.length > 0) {
                        validateResults.push(validate(value[i], data, rules, validateProps))
                    }
                })
                /** ---------------------------------------------------------- */

                // 根据每条检验规则的返回值 进行返回
                return promiseAll(validateResults)
                    .then(res => {
                        this.handleError(res === true ? undefined : res)
                        return res
                    })
                    .catch(e => {
                        this.handleError(e)
                        return e
                    })
            }

            /** 子组件value改变 (datum管理value) 此处驱动更新 */
            handleChange = (value, ...args) => {
                const { formDatum, name, fieldSetValidate, onChange } = this.props

                const currentValue = this.getValue()

                if (args.length === 0 && shallowEqual(value, currentValue)) {
                    return
                }

                const beforeChange = beforeValueChange(this.props.beforeChange)

                /** TODO */
                if (formDatum && name) {
                    value = beforeChange(value, formDatum)

                    formDatum.set(name, value)

                    formDatum.removeFormError(this.errorName)
                } else {
                    value = beforeChange(value, null)

                    this.setState({ value })

                    /** TODO  */
                    this.validate(value).catch(() => {})
                }

                onChange?.(value, ...args)

                fieldSetValidate?.(true)
            }

            /** @todo */
            handleUpdate = (value, sn, type) => {
                if (type === ERROR_TYPE) {
                    if (!isSameError(value, this.state.error)) this.setState({ error: value })
                    return
                }

                const { name, onChange, forceChangeOnValueSet } = this.props
                const newValue = !Array.isArray(name)
                    ? value
                    : immer(this.getValue(), draft => {
                          name.forEach((n, i) => {
                              if (n === sn) draft[i] = value
                          })
                      })

                if (shallowEqual(newValue, this.lastValue)) return
                this.lastValue = newValue

                if (type === FORCE_PASS) {
                    this.handleError()
                    this.setState({ error: undefined })
                    this.forceUpdate()
                    return
                }

                if (onChange && forceChangeOnValueSet) onChange(newValue)

                if (type !== IGNORE_VALIDATE) {
                    if (this.updateTimer) clearTimeout(this.updateTimer)

                    this.updateTimer = setTimeout(() => {
                        this.validate(newValue, undefined, type).catch(() => {})
                    }, 0)
                }
                this.forceUpdate()
            }

            render() {
                const {
                    formDatum,
                    value,
                    required,
                    loopContext,
                    bind,
                    onItemError,
                    bindInputToItem,
                    unbindInputFromItem,
                    scuSkip,
                    defaultValue,
                    ...other
                } = this.props

                return (
                    <Origin
                        {...other}
                        formDatum={formDatum}
                        error={this.getError()}
                        value={this.getValue()}
                        onChange={this.handleChange}
                        onDatumBind={this.handleDatumBind}
                        validateHook={this.validateHook}
                    />
                )
            }
        }
    )
)
