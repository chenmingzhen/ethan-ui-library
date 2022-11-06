import React from 'react'
import classnames from 'classnames'
import { getKey } from '@/utils/uid'
import { CHANGE_ACTION } from '@/utils/Datum/types'
import { checkInputClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { Provider } from '../Checkbox/context'
import Radio from './Radio'
import { RadioGroupProps } from './type'
import { CheckItemGroupDefaultDataRecord, CheckItemProps } from '../Checkbox/type'

export default class RadioGroup<D = CheckItemGroupDefaultDataRecord, FD = D> extends PureComponent<
    RadioGroupProps<D, FD>
> {
    static defaultProps = {
        renderItem: (d) => d,
    }

    static displayName = 'EthanRadioGroup'

    componentDidMount() {
        super.componentDidMount()

        this.props.datum.subscribe(CHANGE_ACTION, this.handleUpdate)
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.props.datum.unsubscribe(CHANGE_ACTION, this.handleUpdate)
    }

    handleUpdate = () => {
        this.forceUpdate()
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

    handleClick = (checked: boolean, index: number) => {
        const { data, datum } = this.props

        datum.set(checked ? data[index] : [])
    }

    handleGroupCallback: CheckItemProps['onGroupCallback'] = (value, checked) => {
        const { datum } = this.props

        datum.set(checked ? value : [])
    }

    render() {
        const { block, data, datum, keygen, children, button, size } = this.props

        const className = classnames(
            checkInputClass(
                'group',
                block && 'block',
                button && 'button',
                button === 'outline' && 'outline',
                button && size
            ),
            this.props.className
        )

        if (data === undefined) {
            return (
                <div className={className}>
                    <Provider value={{ onGroupCallback: this.handleGroupCallback, checked: datum.check.bind(datum) }}>
                        {children}
                    </Provider>
                </div>
            )
        }

        return (
            <div className={className}>
                {data.map((d, i) => (
                    <Radio
                        checked={datum.check(d)}
                        disabled={datum.disabled(d)}
                        key={getKey(d, keygen, i)}
                        index={i}
                        internalOnChange={this.handleClick}
                    >
                        {this.getContent(d)}
                    </Radio>
                ))}
                {children}
            </div>
        )
    }
}
