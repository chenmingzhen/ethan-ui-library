import { Rule } from '@/component/Rule/type'
import { isSameError, promiseAll } from '@/utils/errors'
import { isArray } from '@/utils/is'
import { useCallback, useState } from 'react'
import execValidate from '@/utils/validate'

interface UseValidateProps {
    rules: Rule[]

    onError?(error: Error): void
}

function useValidate(props: UseValidateProps) {
    const { rules } = props
    const [error, updateError] = useState(undefined)

    const handleError = useCallback(
        (err) => {
            const { onError } = props

            if (isSameError(err, error)) return

            if (onError) {
                onError(err)
            }

            updateError(err)
        },
        [error]
    )

    const validate = useCallback(
        (value, data?) => {
            const validateResults = []

            if (isArray(rules) && rules.length > 0) {
                validateResults.push(execValidate(value, data, rules, {}))
            }

            return promiseAll(validateResults)
                .then((res) => {
                    handleError(res === true ? undefined : res)
                    return res
                })
                .catch((e) => {
                    handleError(e)
                    return e
                })
        },
        [handleError, rules]
    )

    return { validate, error }
}

export default useValidate
