import React from 'react'
import { Rule } from '@/component/Rule/type'
import { Component } from '@/utils/component'
import { isSameError, promiseAll } from '@/utils/errors'
import { curry } from '@/utils/func'
import { isArray } from '@/utils/is'
import { filterProps } from '@/utils/objects'
import validate from '@/utils/validate'

interface ValidateHocProps {
    rules?: Rule[]

    onError?: (error: Error) => void
}

export interface ValidateHocOutPutProps {
    validate(value, data?): Promise<Error | undefined>

    error: Error

    onInternalError(error: Error): void
}

export default curry(
    (Origin) =>
        class extends Component<ValidateHocProps, { error: Error }> {
            constructor(props) {
                super(props)

                this.state = {
                    error: undefined,
                }
            }

            handleError = (error) => {
                const { onError } = this.props

                if (isSameError(error, this.state.error)) return

                if (onError) {
                    onError(error)
                }

                this.setState({ error })
            }

            validate = (value, data?: any) => {
                const { rules } = this.props

                const validateResults = []

                const validateProps = filterProps(this.props, (v) => typeof v === 'string' || typeof v === 'number')

                if (isArray(rules) && rules.length > 0) {
                    validateResults.push(validate(value, data, rules, validateProps))
                }
                /** ---------------------------------------------------------- */
                // 根据每条检验规则的返回值 进行返回
                return promiseAll(validateResults)
                    .then((res) => {
                        this.handleError(res === true ? undefined : res)
                        return res
                    })
                    .catch((e) => {
                        this.handleError(e)
                        return e
                    })
            }

            render() {
                return (
                    <Origin
                        {...this.props}
                        error={this.state.error}
                        onInternalError={this.handleError}
                        validate={this.validate}
                    />
                )
            }
        }
)
