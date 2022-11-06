import React from 'react'
import classnames from 'classnames'
import { inputClass, selectClass, cascaderClass } from '@/styles'
import { addResizeObserver } from '@/utils/dom/element'
import { isSameArrayValue } from '@/utils/array'
import { runInNextFrame } from '@/utils/nextFrame'
import { debounce } from '@/utils/func'
import { CascaderResultProps } from './type'
import Caret from '../icons/Caret'
import More from './More'
import { getResetMore } from './util'

interface CascaderResultState {
    showNum: number
}

export default class Result extends React.PureComponent<CascaderResultProps, CascaderResultState> {
    static defaultProps = {
        value: [],
    }

    resultElement: HTMLElement

    cancelResizeObserver: () => void

    shouldResetMore = false

    constructor(props) {
        super(props)

        this.state = {
            showNum: -1,
        }
    }

    componentDidMount() {
        const { compressed } = this.props

        if (compressed) {
            runInNextFrame(this.resetMore)

            this.cancelResizeObserver = addResizeObserver(this.resultElement, debounce(this.resetMore), {
                direction: 'x',
            })
        }
    }

    componentDidUpdate(prevProps: CascaderResultProps) {
        const { value, compressed } = this.props

        if (compressed) {
            if (!isSameArrayValue(prevProps.value, value)) {
                this.resetMore()
            } else if (value.length && this.shouldResetMore) {
                this.shouldResetMore = false

                this.setState({
                    showNum: getResetMore({
                        fixWidth: 0,
                        container: this.resultElement,
                        doms: this.resultElement.querySelectorAll(`.${cascaderClass('item')}`),
                    }),
                })
            }
        }
    }

    componentWillUnmount(): void {
        if (this.cancelResizeObserver) {
            this.cancelResizeObserver()
        }
    }

    resetMore = () => {
        /** reset的作用是重置More中的DOM，获取所有的 Item 计算 */
        this.setState({ showNum: -1 })
        this.forceUpdate()
        this.shouldResetMore = true
    }

    handleNodeClick = (id) => {
        const { datum, onPathChange } = this.props

        const { path } = datum.getPath(id)

        onPathChange(id, null, path)
    }

    handleNode = () => {
        const { value, datum, renderResult, renderItem } = this.props

        let render: any = renderResult || renderItem

        if (typeof render === 'string') {
            const key = render

            render = (data) => data[key]
        }

        const nodes = value.map((v) => datum.getDataById(v))

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

    renderPlaceholder = () => (
        <span
            key="ethan-cascader-placeholder"
            className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}
        >
            {this.props.placeholder}
            &nbsp;
        </span>
    )

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

    renderMore = (items: React.ReactNode[]) => {
        const { showNum } = this.state

        const { cascaderId } = this.props

        return [<More itemNodes={items} key="ethan-cascader-more" showNum={showNum} dataId={cascaderId} />]
    }

    renderResult = () => {
        const { compressed } = this.props

        let items = this.handleNode()

        if (compressed) {
            items = this.renderMore(items)
        }

        if (items.length === 0) {
            items.push(this.renderPlaceholder())
        }

        return items
    }

    render() {
        const { style, value } = this.props

        const result = value.length === 0 ? this.renderPlaceholder() : this.renderResult()

        return (
            <div
                className={cascaderClass('result')}
                style={style}
                ref={(el) => {
                    this.resultElement = el
                }}
            >
                {result}
                {this.renderIndicator()}
                {this.renderClear()}
            </div>
        )
    }
}
