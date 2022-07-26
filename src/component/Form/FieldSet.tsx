import React from 'react'
import withValidate from '@/hoc/withValidate'
import { PureComponent } from '@/utils/component'
import { isFunc } from '@/utils/is'
import { compose } from '@/utils/func'
import { IFieldSetProps } from './type'
import { FieldSetConsumer, FieldSetProvider } from './context/fieldSetContext'
import FormHelp from './FormHelp'
import withFlow from './Hoc/withFlow'
import withFormConsumer from './Hoc/withFormConsumer'

function extendName(path = '', name: string | string[]) {
    if (name === undefined) return undefined

    if (name === '') return path

    if (Array.isArray(name)) return name.map(n => extendName(path, n))

    return `${path}${path.length > 0 ? '.' : ''}${name}`
}

class FieldSet extends PureComponent<IFieldSetProps> {
    constructor(props: IFieldSetProps) {
        super(props)

        const { defaultValue, formDatum, validate, name, onFlowUpdateBind } = this.props

        if (formDatum && name) {
            formDatum.bind(name, this.handleUpdate, defaultValue, validate)
        }

        onFlowUpdateBind(this.forceUpdate)
    }

    componentWillUnmount() {
        const { formDatum, name } = this.props

        if (formDatum && name) {
            formDatum.unbind(name)
        }
    }

    handleUpdate = () => {
        const { validate, formDatum, name } = this.props

        const value = formDatum.get(name)

        validate(value).catch(() => {})

        this.forceUpdate()
    }

    handleInsert = (index: number, value) => {
        const { name, formDatum } = this.props

        formDatum.insert(name, index, value)

        this.handleUpdate()
    }

    handleRemove = (index: number) => {
        const { formDatum, name } = this.props

        formDatum.splice(name, index)

        this.handleUpdate()
    }

    render() {
        const { name, defaultValue, emptyRender, children, formDatum, error, animation } = this.props

        if (!isFunc(children)) {
            return (
                <FieldSetProvider value={{ path: name }}>
                    {children}
                    <FormHelp error={error} animation={animation} />
                </FieldSetProvider>
            )
        }

        const values = formDatum.get(name) || defaultValue || []

        if (!values.length && emptyRender) {
            return (
                <>
                    {emptyRender(this.handleInsert.bind(this, 0))}
                    <FormHelp error={error} animation={animation} />
                </>
            )
        }

        return (
            <>
                {values.map((value, i) => {
                    return (
                        <FieldSetProvider key={i} value={{ path: `${name}[${i}]` }}>
                            {children({
                                onAppend: this.handleInsert.bind(this, i + 1),
                                onRemove: this.handleRemove.bind(this, i),
                                onInsert: this.handleInsert.bind(this),
                                list: values,
                                index: i,
                                value,
                            })}
                        </FieldSetProvider>
                    )
                })}

                <FormHelp error={error} animation={animation} />
            </>
        )
    }
}

export const fieldSetConsumer = Origin => props => (
    <FieldSetConsumer>{({ path } = {}) => <Origin {...props} name={extendName(path, props.name)} />}</FieldSetConsumer>
)

export default compose(withFormConsumer(['formDatum', 'animation']), withValidate, withFlow)(FieldSet)
