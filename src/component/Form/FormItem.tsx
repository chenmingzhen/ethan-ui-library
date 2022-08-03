import React, { cloneElement, createContext, isValidElement } from 'react'
import classnames from 'classnames'
import deepEqual from 'deep-eql'
import { PureComponent } from '@/utils/component'
import { formClass } from '@/styles'
import { isSameError } from '@/utils/errors'
import { isArray, isFunc } from '@/utils/is'
import withValidate from '@/hoc/withValidate'
import immer from 'immer'
import shallowEqual from '@/utils/shallowEqual'
import { ERROR_ACTION, IGNORE_VALIDATE_ACTION, RESET_ACTION } from '@/utils/Datum/types'
import { compose } from '@/utils/func'
import { getGrid } from '../Grid/util'
import { FormItemErrorListContext, FormItemProps, IFormItemProps } from './type'
import FormHelp from './FormHelp'
import { fieldSetConsumer } from './FieldSet'
import withFlow from './Hoc/withFlow'
import { FormItemProvider } from './context/formItemContext'
import withFormConsumer from './Hoc/withFormConsumer'

interface FormItemState {
    errors: Record<string, Error>
}

const { Provider: ErrorListProvider, Consumer: ErrorListConsumer } = createContext<FormItemErrorListContext>(undefined)

function arrayNamesToStr(name: string | string[] = '') {
    if (!isArray(name)) {
        return name
    }

    return name.join('_ETHAN_JOIN_')
}

class FormItem extends PureComponent<IFormItemProps, FormItemState> {
    lastValue

    static defaultProps = {
        name: '',
    }

    constructor(props) {
        super(props)

        const { name = '', onFlowUpdateBind, error, onUpdateChildItemErrors } = this.props

        this.state = {
            errors: {
                [arrayNamesToStr(name)]: undefined,
            },
        }

        this.bindInput(this.props.name)

        if (error && onUpdateChildItemErrors) {
            onUpdateChildItemErrors(arrayNamesToStr(name), error)
        }

        onFlowUpdateBind(this.forceUpdate)
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
        const { name, error, onUpdateChildItemErrors, formDatum } = this.props

        if (!deepEqual(prevProps.name, this.props.name) && formDatum) {
            this.unBindInput(prevProps.name)

            this.bindInput(this.props.name)
        } else if (onUpdateChildItemErrors && !isSameError(prevError, error)) {
            onUpdateChildItemErrors(arrayNamesToStr(name), error)
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.unBindInput(this.props.name)
    }

    bindInput = (name: string | string[]) => {
        const { defaultValue, formDatum, validate } = this.props

        if (formDatum && name) {
            if (!isArray(name)) {
                formDatum.bind(name, this.handleUpdate, defaultValue, validate)
            } else {
                const defaultValues = isArray(defaultValue) ? defaultValue : [defaultValue]

                name.forEach((n, i) => formDatum.bind(n, this.handleUpdate, defaultValues[i], validate))
            }
        }
    }

    unBindInput = (name: string | string[]) => {
        const { formDatum, onUpdateChildItemErrors, preserve } = this.props

        if (formDatum && name) {
            formDatum.unbind(name, preserve)
        }

        if (onUpdateChildItemErrors) {
            onUpdateChildItemErrors(arrayNamesToStr(name), undefined)
        } else {
            /** Root */
            this.updateChildItemErrors(arrayNamesToStr(name), undefined)
        }
    }

    updateChildItemErrors = (nameStr: string, error: Error) => {
        this.setImmerState(draft => {
            if (error) {
                draft.errors[nameStr] = error
            } else {
                delete draft.errors[nameStr]
            }
        })
    }

    handleUpdate = (name, data, type) => {
        const { name: propName, validate, error, onInternalError, formDatum } = this.props

        /** ERROR_ACTION */
        if (type === ERROR_ACTION) {
            if (!isSameError(data, error)) {
                onInternalError(data)
            }

            return
        }

        if (type === RESET_ACTION) {
            onInternalError(undefined)
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

        const formValue = formDatum.getValue()

        if (validate && type !== IGNORE_VALIDATE_ACTION && type !== RESET_ACTION) {
            validate(newValue, formValue).catch(() => {})
        }

        this.forceUpdate()
    }

    handleChange = (value, ...args) => {
        const { name, formDatum, children } = this.props

        const anyChildren = children as any

        if (isArray(name)) {
            name.forEach((n, i) => formDatum.set({ name: n, value: value[i], FOR_INTERNAL_USE_DISPATCH_CHANGE: true }))
        } else {
            formDatum.set({ name, value, FOR_INTERNAL_USE_DISPATCH_CHANGE: true })
        }

        if (anyChildren && anyChildren.props && anyChildren.props.onChange && isFunc(anyChildren.props.onChange)) {
            anyChildren.props.onChange(value, ...args)
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
        const { children, formDatum, error } = this.props

        const { value } = this

        if (typeof children === 'function') {
            return children({ value, onChange: this.handleChange, form: formDatum.getForm(), error })
        }

        if (isValidElement(children)) {
            return cloneElement(children, { value, onChange: this.handleChange })
        }

        return children
    }

    renderHelp = () => {
        const { onUpdateChildItemErrors, animation, tip } = this.props

        const { errors } = this.state

        /** 非顶层FormItem */
        if (onUpdateChildItemErrors) {
            if (tip) {
                return <FormHelp tip={tip} animation={animation} />
            }

            return null
        }

        return (
            <>
                {Object.keys(errors).map(key => {
                    return <FormHelp error={errors[key]} animation={animation} key={key} />
                })}

                {tip ? <FormHelp tip={tip} animation={animation} /> : null}
            </>
        )
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
            noErrorInRoot,
        } = this.props

        const { errors } = this.state

        if (noStyle) {
            return (
                <FormItemProvider value={{ hasItemError: !!error }}>
                    {this.renderChildren()}

                    {this.renderHelp()}
                </FormItemProvider>
            )
        }

        const className = classnames(
            getGrid(grid),
            formClass(
                'item',
                required && 'required',
                /**
                 * @todo
                 * 下面的样式是为了兼容InputGroup的，但是有点别扭。
                 * 因为FormItem内的输入型组件（有InputBorder包裹）的Error样式是通过FormItem的上下文读取的,
                 * 由于InputGroup不存在成为受控组件的条件（没有value和onChange），所以没有hasItemError的值
                 * 如果想让InputGroup获取样式，需要在formless中添加InputGroup的invalid的样式，并且要封装一下InputGroup，例如使用children函数的形式
                 * 如果包裹InputGroup的顶层FormItem是noStyle.则error下InputGroup的样式会失效
                 */
                Object.keys(errors).filter(key => !!errors[key]).length && 'invalid',
                ['top', 'right'].indexOf(labelAlign) >= 0 && `label-align-${labelAlign}`
            ),
            this.props.className
        )

        return (
            <ErrorListProvider
                value={{
                    /** 根FormItem不收集错误 */
                    onUpdateChildItemErrors:
                        noErrorInRoot && !onUpdateChildItemErrors
                            ? undefined
                            : onUpdateChildItemErrors || this.updateChildItemErrors,
                }}
            >
                <FormItemProvider value={{ hasItemError: !!error }}>
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
                </FormItemProvider>
            </ErrorListProvider>
        )
    }
}

/** 顶层FormItem收集Error统一显示 */
const withCollectError = Origin =>
    React.memo(props => (
        <ErrorListConsumer>
            {({ onUpdateChildItemErrors } = {}) => {
                return <Origin onUpdateChildItemErrors={onUpdateChildItemErrors} {...props} />
            }}
        </ErrorListConsumer>
    ))

interface ComputedFormItem {
    new <Value = any>(props: FormItemProps): React.PureComponent<FormItemProps<Value>>
}

export default compose(
    withFormConsumer(['formDatum', 'labelWidth', 'labelAlign', 'keepErrorHeight', 'animation', 'preserve']),
    withValidate,
    fieldSetConsumer,
    withFlow,
    withCollectError
)(FormItem) as ComputedFormItem
