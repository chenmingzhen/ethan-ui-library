import { Rule } from '@/component/Rule/type'
import { isArray } from '@/utils/is'
import { useState } from 'react'
import execValidate from '@/utils/validate'
import { isEveryRulePass, isSameError } from '@/utils/errors'
import useRefMethod from '@/hooks/useRefMethod'

interface UseFormValidateProps {
    rules?: Rule[]
    onError?: (error: Error) => void
}

export default function useFormValidate(props: UseFormValidateProps) {
    const { rules, onError } = props
    const [error, updateError] = useState<Error | null>()

    const handleError = useRefMethod((err) => {
        if (isSameError(err, error)) return

        if (onError) {
            onError(err)
        }

        updateError(err)
    })

    const validate = useRefMethod((value, data?) => {
        const validateResults = []

        if (isArray(rules) && rules.length > 0) {
            validateResults.push(execValidate(value, data, rules, {}))
        }
        /** ---------------------------------------------------------- */

        // 根据每条检验规则的返回值 进行返回
        return isEveryRulePass(validateResults)
            .then(() => {
                handleError(null)

                return null
            })
            .catch((e) => {
                handleError(e)

                return e
            })
    })

    return { error, validate, updateError: handleError }
}
