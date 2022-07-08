import React from 'react'
import { curry } from '@/utils/func'
import { FormConsumer as Consumer } from '../context/formContext'

export const FormConsumer = curry((keys, Origin, props) => {
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

    return (
        <Consumer>
            {value => {
                const formProps = filterProps(value)
                return <Origin {...formProps} {...props} disabled={formProps.disabled || props.disabled} />
            }}
        </Consumer>
    )
})
