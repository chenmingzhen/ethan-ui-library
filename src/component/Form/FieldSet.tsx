import useUpdate from '@/hooks/useUpdate'
import { CHANGE_ACTION, IGNORE_VALIDATE_ACTION } from '@/utils/Datum/types'
import React, { useContext } from 'react'
import { isFunc } from '@/utils/is'
import useRefMethod from '@/hooks/useRefMethod'
import formContext from './context/formContext'
import useRegister from './hooks/internal/useRegister'
import useSubscribe from './hooks/internal/useSubscribe'
import useFormValidate from './hooks/internal/useFormValidate'
import { FieldSetProps, IFieldSetProps } from './type'
import { FieldSetProvider } from './context/fieldSetContext'
import FormHelp from './FormHelp'

const FieldSet: React.FC<IFieldSetProps> = (props) => {
    const { name, rules, preserve: propPreserve, defaultValue, dependencies, emptyRender, children } = props
    const { formDatum, animation, preserve: formPreserve } = useContext(formContext) || {}
    const preserve = formPreserve || propPreserve
    const update = useUpdate()
    const { error, validate } = useFormValidate({ rules })
    const handleUpdate = useRefMethod((_, __, type) => {
        const formValues = formDatum.getValue()

        const value = formDatum.get(name)

        if (type !== IGNORE_VALIDATE_ACTION) {
            validate(value, formValues).catch(() => {})
        }

        update()
    })
    useSubscribe({ dependencies, name, formDatum, validate })
    useRegister({
        formDatum,
        name,
        onValidate: validate,
        defaultValue,
        preserve,
        onUpdate: handleUpdate,
    })

    if (!isFunc(children)) {
        return (
            <FieldSetProvider value={{ path: name }}>
                {children}
                <FormHelp error={error} animation={animation} />
            </FieldSetProvider>
        )
    }

    function handleInsert(index: number, value) {
        formDatum.insert(name, index, value)

        handleUpdate(undefined, undefined, CHANGE_ACTION)
    }

    function handleRemove(index: number) {
        formDatum.splice(name, index)

        handleUpdate(undefined, undefined, CHANGE_ACTION)
    }

    const values = formDatum.get(name) || defaultValue || []

    if (!values.length && emptyRender) {
        return (
            <>
                {emptyRender(handleInsert.bind(this, 0))}
                <FormHelp error={error} animation={animation} />
            </>
        )
    }

    return (
        <>
            {values.map((value, i) => (
                <FieldSetProvider key={i} value={{ path: `${name}[${i}]` }}>
                    {children({
                        onAppend: handleInsert.bind(this, i + 1),
                        onRemove: handleRemove.bind(this, i),
                        onInsert: handleInsert.bind(this),
                        list: values,
                        index: i,
                        value,
                    })}
                </FieldSetProvider>
            ))}

            <FormHelp error={error} animation={animation} />
        </>
    )
}

interface FieldSetComponent {
    new <Value = any>(props: FieldSetProps): React.Component<FieldSetProps<Value>>
}

export default React.memo(FieldSet) as unknown as FieldSetComponent
