import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { getKey } from '@/utils/uid'
import { CHANGE_ACTION } from '@/utils/Datum/types'
import { checkInputClass } from '@/styles'
import Checkbox from './Checkbox'
import { Provider } from './context'
import { CheckItemProps, ICheckboxGroupProps, CheckItemGroupDefaultDataRecord } from './type'

class CheckboxGroup<D = CheckItemGroupDefaultDataRecord, FD = D> extends PureComponent<ICheckboxGroupProps<D, FD>> {
    static defaultProps = {
        renderItem: (d) => d,
    }

    static displayName = 'EthanCheckboxGroup'

    componentDidMount() {
        super.componentDidMount()

        this.props.datum.subscribe(CHANGE_ACTION, this.handleUpdate)
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.props.datum.unsubscribe(CHANGE_ACTION, this.handleUpdate)
    }

    getContent = (data: D) => {
        const { renderItem } = this.props

        if (typeof renderItem === 'string') {
            return data[renderItem]
        }
        if (typeof renderItem === 'function') {
            return renderItem(data)
        }

        return ''
    }

    handleUpdate = () => {
        this.forceUpdate()
    }

    handleClick = (checked: boolean, index: number) => {
        const { data, datum } = this.props

        if (checked) {
            datum.add({ data: data[index] })
        } else {
            datum.remove({ data: data[index] })
        }
    }

    handleGroupCallback: CheckItemProps['onGroupCallback'] = (value, checked) => {
        const { datum } = this.props

        if (checked) {
            datum.add({ data: value })
        } else {
            datum.remove({ data: value })
        }
    }

    render() {
        const { block, data, datum, keygen, children } = this.props

        const className = classnames(checkInputClass('group', block && 'block'), this.props.className)

        /** 通过wrapperChildren的形式 */
        if (data === undefined) {
            return (
                <div className={className}>
                    <Provider value={{ onGroupCallback: this.handleGroupCallback, checked: datum.check.bind(datum) }}>
                        {children}
                    </Provider>
                </div>
            )
        }

        /** 通过data的形式 */
        return (
            <div className={className}>
                {data.map((d, i) => (
                    <Checkbox
                        checked={datum.check(d)}
                        disabled={datum.disabled(d)}
                        key={getKey<D>(d, keygen, i)}
                        index={i}
                        internalOnChange={this.handleClick}
                    >
                        {this.getContent(d)}
                    </Checkbox>
                ))}
                {children}
            </div>
        )
    }
}

export default CheckboxGroup
