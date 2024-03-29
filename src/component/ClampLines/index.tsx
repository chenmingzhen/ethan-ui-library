import { getLocale } from '@/locale'
import { PureComponent } from '@/utils/component'
import { debounce } from '@/utils/func'
import { styles } from '@/utils/style/styles'
import React from 'react'
import Button from '../Button'
import Popover from '../Popover/Popover'
import { ClampLinesProps } from './type'

interface ClampLinesState {
    expanded: boolean
    noClamp: boolean
    text: string
}

export default class ClampLines extends PureComponent<ClampLinesProps, ClampLinesState> {
    static defaultProps = {
        lines: 3,
        ellipsis: '...',
        showButton: true,
        text: '',
        pop: false,
    }

    element: HTMLElement

    lineHeight = 0

    get originalText() {
        return this.props.text
    }

    constructor(props) {
        super(props)

        this.state = {
            expanded: true,
            noClamp: false,
            text: props.text.substring(0, 1),
        }
    }

    componentDidMount() {
        super.componentDidMount()

        if (this.props.text) {
            this.lineHeight = this.element.clientHeight

            this.clampLines()
        }

        window.addEventListener('resize', this.clampLines)
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        window.removeEventListener('resize', this.clampLines)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.text !== this.props.text || prevProps.lines !== this.props.lines) {
            this.setState({ noClamp: false, expanded: true })
            this.clampLines()
        }
    }

    bindElement = (element: HTMLElement) => {
        this.element = element
    }

    clampLines = debounce(() => {
        if (!this.element) return

        this.setState({ noClamp: false, text: '' })

        const maxHeight = this.lineHeight * this.props.lines

        let start = 0
        let middle = 0
        let end = this.originalText.length

        /** 二分查找，找到适合的的分割index */
        while (start <= end) {
            middle = Math.floor((start + end) / 2)

            this.element.innerText = this.originalText.slice(0, middle)

            if (middle === this.originalText.length) {
                this.setState({
                    text: this.originalText,
                    noClamp: true,
                })
                return
            }

            if (this.element.clientHeight <= maxHeight) {
                start = middle + 1
            } else {
                end = middle - 1
            }
        }

        this.setState({
            text: this.originalText.slice(0, middle - 5) + this.ellipsis,
        })
    })

    get ellipsis() {
        const { expanded, noClamp } = this.state

        if (noClamp || !expanded) return ''

        return this.props.ellipsis
    }

    handleClick = () => {
        this.setDraftState(
            (state) => {
                state.expanded = !state.expanded

                if (!state.expanded) {
                    state.text = this.originalText
                }
            },
            () => {
                if (this.state.expanded) {
                    this.clampLines()
                }
            }
        )
    }

    renderButton = () => {
        const { noClamp, expanded } = this.state

        const { showButton, moreText, lessText } = this.props

        if (noClamp || !showButton) return

        const buttonText = expanded ? moreText || getLocale('expand') : lessText || getLocale('collapse')

        return (
            <Button onClick={this.handleClick} type="link" style={{ padding: 0 }}>
                {buttonText}
            </Button>
        )
    }

    render() {
        const { className, style, pop } = this.props

        const { text, expanded } = this.state

        if (!this.originalText) {
            return null
        }

        if (pop && expanded) {
            const width = this.element?.getBoundingClientRect()?.width

            return (
                <div className={className} style={styles({ wordBreak: 'break-all' }, style)}>
                    <Popover
                        content={this.originalText}
                        innerProps={{ style: { width, whiteSpace: 'break-spaces' } }}
                        mouseEnterDelay={0.3}
                        animation={false}
                    >
                        <div ref={this.bindElement}>{text}</div>
                    </Popover>

                    {this.renderButton()}
                </div>
            )
        }

        return (
            <div className={className} style={styles({ wordBreak: 'break-all' }, style)}>
                <div ref={this.bindElement}>{text}</div>

                {this.renderButton()}
            </div>
        )
    }
}
