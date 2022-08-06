import React, { useContext } from 'react'
import { curry } from '@/utils/func'
import { isEmpty } from '@/utils/is'
import formContext from '../context/formContext'
import { FormContextProps } from '../type'

/**
 * 从FormProvider中读取指定的keys
 */
const withFormConsumer = curry((keys: Array<keyof FormContextProps>, Origin: typeof React.Component, props) => {
    const value = useContext(formContext) || {}

    const formContextProps: any = {}

    if (!isEmpty(value)) {
        keys.forEach(k => {
            const val = value[k]

            if (val !== undefined) {
                formContextProps[k] = val
            }
        })
    }

    return <Origin {...formContextProps} {...props} disabled={formContextProps.disabled || props.disabled} />
})

export default withFormConsumer
