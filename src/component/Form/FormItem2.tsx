import useUpdate from '@/hooks/useUpdate'
import { formClass } from '@/styles'
import { ERROR_ACTION, IGNORE_VALIDATE_ACTION, RESET_ACTION } from '@/utils/Datum/types'
import { isSameError } from '@/utils/errors'
import { isArray, isFunc, isSyntheticEvent } from '@/utils/is'
import shallowEqual from '@/utils/shallowEqual'
import classnames from 'classnames'
import immer from 'immer'
import React, { isValidElement, useContext, cloneElement, createContext, useRef } from 'react'
import { getGrid } from '../Grid/util'
import { FieldSetContext } from './context/fieldSetContext'
import formContext from './context/formContext'
import { FormItemProvider } from './context/formItemContext'
import FormHelp from './FormHelp'
import useBindFormDatum from './hooks/internal/useBindFormDatum'
import { useErrorList } from './hooks/internal/useErrorList'
import useEvent from './hooks/internal/useEvent'
import useFlow from './hooks/internal/useFlow'
import useFormValidate from './hooks/internal/useFormValidate'
import { FormItemErrorListContext, IFormItemProps } from './type'

export const ErrorListContext = createContext<FormItemErrorListContext>(undefined)

function extendName(path = '', name: string | string[]) {
    if (name === undefined) return undefined

    if (name === '') return path

    if (Array.isArray(name)) return name.map((n) => extendName(path, n))

    return `${path}${path.length > 0 ? '.' : ''}${name}`
}

const FormItem: React.FC<IFormItemProps> = (props) => {
    const {
        disabled: propDisabled,
        grid,
        label,
        required,
        style,
        noStyle,
        collectErrorInRoot,
        name: propName,
        rules,
        children,
        beforeChange,
        tip,
        className,
        flow,
        defaultValue,
        preserve: propPreserve,
    } = props
    const {
        formDatum,
        labelWidth,
        labelAlign,
        animation,
        preserve: formPreserve,
        disabled: formDisabled,
    } = useContext(formContext)
    const preserve = propPreserve || formPreserve
    const { path } = useContext(FieldSetContext) || {}
    const name = extendName(path, propName)
    const disabled = propDisabled || formDisabled
    const { error, validate, updateError } = useFormValidate({ rules })
    const { errors, updateErrors, isRoot } = useErrorList({ name, error })
    const update = useUpdate()
    const lastValueRef = useRef<any>(undefined)
    const handleUpdate = useEvent((actionName, data, type) => {
        /** ERROR_ACTION */
        if (type === ERROR_ACTION) {
            if (!isSameError(data, error)) {
                updateError(data)
            }

            return
        }

        if (type === RESET_ACTION) {
            updateError(undefined)
        }

        const newValue = !Array.isArray(name)
            ? data
            : immer(getValue(), (draft) => {
                  name.forEach((n, i) => {
                      if (n === actionName) draft[i] = data
                  })
              })

        if (shallowEqual(newValue, lastValueRef.current)) return

        lastValueRef.current = newValue

        const formValue = formDatum.getValue()

        if (validate && type !== IGNORE_VALIDATE_ACTION && type !== RESET_ACTION) {
            validate(newValue, formValue).catch(() => {})
        }

        update()
    })

    useFlow({ formDatum, name, flow, validate })
    useBindFormDatum({ formDatum, name, preserve, defaultValue, onValidate: validate, onUpdate: handleUpdate })

    function getValue() {
        let value

        if (formDatum && name) {
            if (isArray(name)) {
                value = name.map((n) => formDatum.get(n))
            } else {
                value = formDatum.get(name)
            }
        }

        return value
    }

    function handleChange(rawValue, ...args) {
        const anyChildren = children as any

        const prevValue = formDatum.get(name)

        const value = beforeChange
            ? beforeChange(rawValue, prevValue, formDatum.getForm())
            : isSyntheticEvent(rawValue)
            ? (rawValue.target as HTMLInputElement).value
            : rawValue

        if (isArray(name) && isArray(value)) {
            name.forEach((n, i) => formDatum.set({ name: n, value: value[i], FOR_INTERNAL_USE_DISPATCH_CHANGE: true }))
        } else {
            formDatum.set({ name, value, FOR_INTERNAL_USE_DISPATCH_CHANGE: true })
        }

        if (anyChildren && anyChildren.props && anyChildren.props.onChange && isFunc(anyChildren.props.onChange)) {
            anyChildren.props.onChange(value, ...args)
        }
    }

    function renderChildren() {
        const value = getValue()

        if (typeof children === 'function') {
            return children({ value, onChange: handleChange, form: formDatum.getForm(), error })
        }

        /** 避免react div嵌套Input可以实现onChange  */
        /** 因为 React 并不是将 click 事件直接绑定在 dom 上面，而是采用事件冒泡的形式冒泡到 document 上面 */
        if (!formDatum || !name) return children

        if (isValidElement(children)) {
            return cloneElement<any>(children, { value, onChange: handleChange })
        }

        return null
    }

    function renderHelp() {
        /** 非顶层FormItem */
        if (collectErrorInRoot && !isRoot) {
            if (tip) {
                return <FormHelp tip={tip} animation={animation} />
            }

            return null
        }

        return (
            <>
                {Object.keys(errors).map((key) => (
                    <FormHelp error={errors[key]} animation={animation} key={key} />
                ))}

                {tip ? <FormHelp tip={tip} animation={animation} /> : null}
            </>
        )
    }

    if (noStyle) {
        return (
            <FormItemProvider value={{ hasItemError: !!error, disabled }}>
                {renderChildren()}

                {renderHelp()}
            </FormItemProvider>
        )
    }

    const cls = classnames(
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
            Object.keys(errors).filter((key) => !!errors[key]).length && 'invalid',
            ['top', 'right'].indexOf(labelAlign) >= 0 && `label-align-${labelAlign}`
        ),
        className
    )

    return (
        <ErrorListContext.Provider
            value={{
                /** 根FormItem收集错误 */
                onUpdateRootErrors: collectErrorInRoot && !isRoot ? undefined : updateErrors,
            }}
        >
            <FormItemProvider value={{ hasItemError: !!error, disabled }}>
                <div className={cls} style={style}>
                    {label && (
                        <div style={{ width: labelWidth }} className={formClass('label')}>
                            {label}
                        </div>
                    )}
                    <div className={formClass('control')}>
                        {renderChildren()}

                        {renderHelp()}
                    </div>
                </div>
            </FormItemProvider>
        </ErrorListContext.Provider>
    )
}

export default React.memo(FormItem)
