import React from 'react'
import { PureComponent } from '@/utils/component'
import { SelectFilterHocProps } from '../type'

interface SelectFilterHocState {
    filterText: string

    createData: any
}

export default function FilterHoc(Origin) {
    return class extends PureComponent<SelectFilterHocProps, SelectFilterHocState> {
        resultCache = new Map()

        static defaultProps = {
            data: [],
            cacheAble: true,
        }

        constructor(props) {
            super(props)

            this.state = {
                filterText: '',
                createData: undefined,
            }
        }

        getResultByValues = () => {
            const { datum, cacheAble, treeData, onCreate, data } = this.props

            const { values } = datum

            const results = []

            values.forEach(value => {
                let result = cacheAble ? this.resultCache.get(value) : undefined

                if (result === undefined) {
                    if (treeData) {
                    } else {
                        for (const item of data) {
                            if (datum.prediction(value, item)) {
                                result = item
                            }
                        }

                        if (result === undefined && onCreate) {
                            /** @todo 如果是创建出来的数据 怎么处理 */

                            console.log('todo')

                            result = this.handleCreate(value)
                        }
                    }

                    if (result !== undefined && cacheAble) {
                        this.resultCache.set(value, result)
                    }
                }

                if (result !== undefined) {
                    results.push(result)
                }
            })

            return results
        }

        handleCreate = text => {
            const { onCreate } = this.props

            const createFn = typeof onCreate === 'boolean' ? t => t : onCreate

            return createFn(text)
        }

        handleInput = (text: string) => {
            const { onCreate } = this.props

            this.setState({ filterText: text })

            if (onCreate) {
                if (text !== '') {
                    const createData = this.handleCreate(text)

                    this.setState({ createData })
                } else {
                    this.setState({ createData: undefined })
                }
            }
        }

        getFilterData() {
            const { data, onFilter } = this.props

            const { createData, filterText } = this.state

            let computedData = data

            if (onFilter && filterText) computedData = data.filter(d => onFilter(filterText, d))

            if (createData) {
                computedData = [createData, ...computedData]
            }

            return {
                data: computedData,
            }
        }

        render() {
            const { onFilter, onCreate, treeData, ...other } = this.props

            const { filterText } = this.state

            const dataGenerator = treeData ? () => [] : this.getFilterData

            return (
                <Origin
                    {...other}
                    result={this.getResultByValues()}
                    filterText={filterText}
                    onInput={onFilter || onCreate ? this.handleInput : undefined}
                    {...dataGenerator.call(this)}
                />
            )
        }
    }
}
