import React, { cloneElement, createContext, isValidElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { formClass, inputClass } from '@/styles'
import { isSameError } from '@/utils/errors'
import { isArray, isEmpty, isFunc } from '@/utils/is'
import withValidate from '@/hoc/withValidate'
import immer from 'immer'
import shallowEqual from '@/utils/shallowEqual'
import { ERROR_ACTION } from '@/utils/Datum/types'
import { compose } from '@/utils/func'
import { getUidStr } from '@/utils/uid'
import { getGrid } from '../Grid/util'
import { FormItemErrorListContext, IFormItemProps } from './type'
import FormHelp from './FormHelp'
import { fieldSetConsumer } from './FieldSet'
import withFlow from './Hoc/withFlow'

interface FormItemState {
    errors: Record<string, Error>
}

const { Provider, Consumer } = createContext<FormItemErrorListContext>(undefined)

function arrayNamesToStr(name: string | string[] = '') {
    if (!isArray(name)) {
        return name
    }

    return name.join('_ETHAN_JOIN_')
}

class FormItem extends PureComponent<IFormItemProps, FormItemState> {
    lastValue

    validateTimer: NodeJS.Timeout

    static defaultProps = {
        name: '',
    }

    constructor(props) {
        super(props)

        const {
            defaultValue,
            formDatum,
            validate,
            name = '',
            onFlowUpdateBind,
            error,
            onUpdateChildItemErrors,
        } = this.props

        this.state = {
            errors: {
                [arrayNamesToStr(name)]: undefined,
            },
        }

        if (formDatum && name) {
            if (!isArray(name)) {
                formDatum.bind(name, this.handleUpdate, defaultValue, validate)
            } else {
                const defaultValues = isArray(defaultValue) ? defaultValue : [defaultValue]

                name.forEach((n, i) => formDatum.bind(n, this.handleUpdate, defaultValues[i], validate))
            }
        }

        if (error && onUpdateChildItemErrors) {
            onUpdateChildItemErrors(arrayNamesToStr(name), error)
        }

        onFlowUpdateBind(this.forceUpdate)
    }

    get formable() {
        const { formDatum, name } = this.props

        return formDatum && !isEmpty(name)
    }

    static getDerivedStateFromProps(nextProps: IFormItemProps, state: FormItemState) {
        const nextError = nextProps.error

        return {
            ...state,
            errors: {
                ...state.errors,
                [arrayNamesToStr(nextProps.name)]: nextError,
            },
        }
    }

    componentDidMount() {
        super.componentDidMount()

        this.lastValue = this.value
    }

    componentDidUpdate(prevProps: Readonly<IFormItemProps>): void {
        const prevError = prevProps.error
        const { name, error, onUpdateChildItemErrors } = this.props

        if (onUpdateChildItemErrors && !isSameError(prevError, error)) {
            onUpdateChildItemErrors(arrayNamesToStr(name), error)
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        const { formDatum, name, onUpdateChildItemErrors } = this.props

        if (formDatum && name) {
            formDatum.unbind(name)
        }

        if (onUpdateChildItemErrors) {
            onUpdateChildItemErrors(arrayNamesToStr(name), undefined)
        } else {
            /** Root */
            this.updateChildItemErros(arrayNamesToStr(name), undefined)
        }
    }

    updateChildItemErros = (nameStr: string, error: Error) => {
        this.setImmerState(draft => {
            if (error) {
                draft.errors[nameStr] = error
            } else {
                delete draft.errors[nameStr]
            }
        })
    }

    handleUpdate = (data, name, type) => {
        const { name: propName, validate, error, onInternalError, throttle } = this.props

        /** ERROR_ACTION */
        if (type === ERROR_ACTION) {
            if (!isSameError(data, error)) {
                onInternalError(data)
            }

            return
        }

        const newValue = !Array.isArray(propName)
            ? data
            : immer(this.value, draft => {
                  propName.forEach((n, i) => {
                      if (n === name) draft[i] = data
                  })
              })

        if (shallowEqual(newValue, this.lastValue)) return

        this.lastValue = newValue

        if (validate) {
            if (this.validateTimer) {
                clearTimeout(this.validateTimer)

                this.validateTimer = null
            }

            this.validateTimer = setTimeout(() => {
                validate(newValue, undefined).catch(() => {})
            }, throttle)
        }

        this.forceUpdate()
    }

    handleChange = (value, ...args) => {
        const { name, formDatum, children } = this.props

        const anyChildren = children as any

        if (anyChildren && anyChildren.props && anyChildren.props.onChange && isFunc(anyChildren.props.onChange)) {
            anyChildren.props.onChange(value, ...args)
        }

        if (isArray(name)) {
            name.forEach((n, i) => formDatum.set({ name: n, value: value[i] }))
        } else {
            formDatum.set({ name, value })
        }
    }

    get value() {
        const { formDatum, name } = this.props

        let value

        if (formDatum && name) {
            if (isArray(name)) {
                value = name.map(n => {
                    return formDatum.get(n)
                })
            } else {
                value = formDatum.get(name)
            }
        }

        return value
    }

    renderChildren = () => {
        const { children, formDatum } = this.props

        const { value } = this

        if (!this.formable) return children

        if (typeof children === 'function') {
            return children({ value, onChange: this.handleChange, formDatum })
        }

        if (isValidElement(children)) {
            return cloneElement(children, { value, onChange: this.handleChange })
        }

        return children
    }

    renderHelp = () => {
        const { onUpdateChildItemErrors, animation } = this.props

        const { errors } = this.state

        /** 非顶层FormItem */
        if (onUpdateChildItemErrors) {
            return null
        }

        return Object.keys(errors).map(key => {
            return <FormHelp error={errors[key]} animation={animation} key={key} />
        })
    }

    render() {
        const {
            grid,
            label,
            labelAlign,
            labelWidth,
            required,
            style,
            error,
            onUpdateChildItemErrors,
            noStyle,
        } = this.props

        const { errors } = this.state

        if (noStyle) {
            return (
                <>
                    {this.renderChildren()}

                    {this.renderHelp()}
                </>
            )
        }

        const className = classnames(
            getGrid(grid),
            formClass(
                'item',
                required && 'required',
                error && 'invalid',
                // Object.keys(errors).filter(key => !!errors[key]).length && 'invalid',
                ['top', 'right'].indexOf(labelAlign) >= 0 && `label-align-${labelAlign}`
            ),
            this.props.className
        )

        return (
            <Provider value={{ onUpdateChildItemErrors: onUpdateChildItemErrors || this.updateChildItemErros }}>
                <div className={className} style={style}>
                    {label && (
                        <div style={{ width: labelWidth }} className={formClass('label')}>
                            {label}
                        </div>
                    )}
                    <div className={formClass('control')}>
                        {this.renderChildren()}

                        {this.renderHelp()}
                    </div>
                </div>
            </Provider>
        )
    }
}

const withErrorList = Origin =>
    React.memo(props => (
        <Consumer>
            {({ onUpdateChildItemErrors } = {}) => {
                return <Origin onUpdateChildItemErrors={onUpdateChildItemErrors} {...props} />
            }}
        </Consumer>
    ))

export default compose(withValidate, fieldSetConsumer, withFlow, withErrorList)(FormItem)
