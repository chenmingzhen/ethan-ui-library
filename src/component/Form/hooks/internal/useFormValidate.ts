import { Rule } from '@/component/Rule/type'
import { isArray } from '@/utils/is'
import { filterProps } from '@/utils/objects'
import { useState } from 'react'
import execValidate from '@/utils/validate'
import { isSameError, promiseAll } from '@/utils/errors'
import useEvent from './useEvent'

interface UseFormValidateProps {
    rules?: Rule[]
    onError?: (error: Error) => void
}

export default function useFormValidate(props: UseFormValidateProps) {
    const { rules, onError } = props
    const [error, updateError] = useState<Error | undefined>()

    const handleError = useEvent((err) => {
        if (isSameError(err, error)) return

        if (onError) {
            onError(err)
        }

        updateError(err)
    })

    const validate = useEvent((value, data?) => {
        const validateResults = []

        if (isArray(rules) && rules.length > 0) {
            validateResults.push(execValidate(value, data, rules, {}))
        }
        /** ---------------------------------------------------------- */
        // 根据每条检验规则的返回值 进行返回
        return promiseAll(validateResults)
            .then((res) => {
                handleError(res === true ? undefined : res)
                return res
            })
            .catch((e) => {
                handleError(e)
                return e
            })
    })

    return { error, validate, updateError: handleError }
}
