import { Component } from '@/utils/component'
import { CHANGE_ACTION } from '@/utils/Datum/types'
import { isArray, isEmpty } from '@/utils/is'
import React from 'react'
import { WithFlowProps } from '../type'

/** 监听特定的字段触发重渲染 */
const withFlow = (Origin) =>
    class extends Component<WithFlowProps> {
        forceUpdateChildren: () => void

        constructor(props: WithFlowProps) {
            super(props)

            const { formDatum, flow } = props

            if (!formDatum || isEmpty(flow)) return

            if (isArray(flow)) {
                flow.forEach((n) => {
                    formDatum.subscribe(n, this.handleUpdate)
                })
            } else if (flow === true) {
                const { $inputNames } = formDatum

                Object.keys($inputNames).forEach((n) => {
                    formDatum.subscribe(n, this.handleUpdate)
                })
            }
        }

        handleUpdate = (_, __, type) => {
            const { formDatum, validate, name } = this.props

            if (formDatum && !isEmpty(name)) {
                const formValue = formDatum.getValue()

                const value = formDatum.get(name)

                if (type === CHANGE_ACTION) {
                    validate(value, formValue).catch(() => {})
                }
            }

            if (this.forceUpdateChildren) {
                this.forceUpdateChildren()
            }
        }

        handleFlowUpdateBind = (fn: () => void) => {
            this.forceUpdateChildren = fn
        }

        componentWillUnmount() {
            const { formDatum, flow } = this.props

            if (!formDatum) return

            if (isArray(flow)) {
                flow.forEach((n) => {
                    formDatum.unsubscribe(n, this.handleUpdate)
                })
            } else if (flow === true) {
                const { $inputNames } = formDatum

                Object.keys($inputNames).forEach((n) => {
                    formDatum.unsubscribe(n, this.handleUpdate)
                })
            }
        }

        render() {
            return <Origin {...this.props} onFlowUpdateBind={this.handleFlowUpdateBind} />
        }
    }

export default withFlow
