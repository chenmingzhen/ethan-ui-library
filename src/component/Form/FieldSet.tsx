import React from 'react'
import withValidate from '@/hoc/withValidate'
import { PureComponent } from '@/utils/component'
import { isFunc } from '@/utils/is'
import { IFieldSetProps } from './type'
import { FieldSetConsumer, FieldSetProvider } from './context/fieldSetContext'
import FormHelp from './FormHelp'

function extendName(path = '', name: string | string[]) {
    if (name === undefined) return undefined

    if (name === '') return path

    if (Array.isArray(name)) return name.map(n => extendName(path, n))

    return `${path}${path.length > 0 ? '.' : ''}${name}`
}

class FieldSet extends PureComponent<IFieldSetProps> {
    constructor(props: IFieldSetProps) {
        super(props)

        const { defaultValue, formDatum, validate, name } = this.props

        if (formDatum && name) {
            formDatum.bind(name, this.handleUpdate, defaultValue, validate)
        }

        window.formDatum = formDatum
    }

    handleUpdate = () => {
        const { validate, formDatum, name } = this.props

        const value = formDatum.get(name)

        validate(value).catch(() => {})

        this.forceUpdate()
    }

    /** @todo 完善这个方法 */
    handleChange = (index: number, value) => {
        const { formDatum, name, validate } = this.props

        formDatum.set({ name: `${name}[${index}]`, value })
    }

    handleInsert = (index: number, value) => {
        const { name, formDatum } = this.props

        formDatum.insert(name, index, value)

        this.handleUpdate()
    }

    render() {
        const { name, defaultValue, empty, children, formDatum, error, keygen } = this.props

        if (!isFunc(children)) {
            return (
                <FieldSetProvider value={{ path: name }}>
                    {children}
                    <FormHelp error={error} />
                </FieldSetProvider>
            )
        }

        const values = formDatum.get(name) || defaultValue || []

        if (!values.length && empty) {
            return (
                <>
                    {empty(this.handleInsert.bind(this, 0))}
                    <FormHelp error={error} />
                </>
            )
        }

        return (
            <>
                {values.map((value, i) => {
                    return (
                        <FieldSetProvider key={keygen ? keygen(value) : i} value={{ path: `${name}[${i}]` }}>
                            {children({ onAppend: this.handleInsert.bind(this, i + 1) })}
                        </FieldSetProvider>
                    )
                })}

                <FormHelp error={error} />
            </>
        )
    }
}

export const fieldSetConsumer = Origin => props => (
    <FieldSetConsumer>{({ path } = {}) => <Origin {...props} name={extendName(path, props.name)} />}</FieldSetConsumer>
)

export default withValidate(FieldSet)
