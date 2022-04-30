import React from 'react'
import classnames from 'classnames'
import { inputClass, selectClass, cascaderClass } from '@/styles'
import { CascaderResultProps } from './type'
import Caret from '../icons/Caret'

export default class Result extends React.PureComponent<CascaderResultProps> {
    static defaultProps = {
        value: [],
    }

    handleNodeClick = id => {
        const { datum, onPathChange } = this.props

        const { path } = datum.getPath(id)

        onPathChange(id, null, path)
    }

    handleNode = () => {
        const { value, datum, renderResult, renderItem } = this.props

        let render: any = renderResult || renderItem

        if (typeof render === 'string') {
            const key = render

            render = data => data[key]
        }

        const nodes = value.map(v => datum.getDataById(v))

        const items: React.ReactNode[] = []

        nodes.forEach((node, index) => {
            if (!node) return

            const res = render(node, nodes)

            if (!res) return null

            items.push(
                <a
                    tabIndex={-1}
                    className={cascaderClass('item')}
                    onClick={() => {
                        this.handleNodeClick(value[index])
                    }}
                    key={index}
                >
                    {res}
                </a>
            )
        })

        return items
    }

    renderPlaceholder = () => {
        return (
            <span
                key="ethan-cascader-placeholder"
                className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}
            >
                {this.props.placeholder}
                &nbsp;
            </span>
        )
    }

    renderClear = () => {
        const { clearable, value, disabled, onClear } = this.props

        const className = classnames(selectClass('indicator', 'close'), cascaderClass('close'))

        if (clearable && value.length > 0 && !disabled) {
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            return <a className={className} onClick={onClear} />
        }

        return null
    }

    renderIndicator = () => {
        const { multiple } = this.props

        if (multiple) return null

        const showCaret = !multiple

        return (
            <a tabIndex={-1} className={selectClass('indicator', multiple ? 'multi' : 'caret')}>
                {showCaret && <Caret />}
            </a>
        )
    }

    /** @todo */
    renderMore = (items: React.ReactNode[]) => {
        return items
    }

    renderResult = () => {
        const items = this.handleNode()

        if (items.length === 0) {
            items.push(this.renderPlaceholder())
        }

        return items
    }

    render() {
        const { style, value } = this.props

        const result = value.length === 0 ? this.renderPlaceholder() : this.renderResult()

        return (
            <div className={cascaderClass('result')} style={style}>
                {result}
                {this.renderIndicator()}
                {this.renderClear()}
            </div>
        )
    }
}
