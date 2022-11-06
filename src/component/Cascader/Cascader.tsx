import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { getUidStr } from '@/utils/uid'
import TreeDatum, { KeygenParams } from '@/utils/Datum/Tree'
import { cascaderClass, selectClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { addResizeObserver, isDescendent } from '@/utils/dom/element'
import { runInNextFrame } from '@/utils/nextFrame'
import { throttleWrapper } from '@/utils/lazyload'
import Result from './Result'
import CascaderList from './List'
import { CascaderState, CascaderProps } from './type'
import AnimationList from '../List'
import AbsoluteList from '../List/AbsoluteList'

class Cascader<T> extends PureComponent<CascaderProps, CascaderState> {
    static defaultProps = {
        clearable: true,
        expandTrigger: 'click',
        height: 300,
        data: [],
        childrenKey: 'children',
    }

    datum: TreeDatum

    isRendered = false

    cascaderId = getUidStr()

    containerElementRef = React.createRef<HTMLDivElement>()

    list: HTMLDivElement

    cancelResizeObserver: () => void

    constructor(props) {
        super(props)

        this.state = {
            focus: false,
            path: [],
            position: 'drop-down',
            listStyle: props.data.length === 0 ? { height: 'auto', width: '100%' } : { height: props.height },
        }

        this.datum = new TreeDatum({
            data: props.data,
            keygen: this.keygen,
            mode: props.mode,
            value: props.value || props.defaultValue,
            disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
            childrenKey: props.childrenKey,
        })
    }

    componentDidMount() {
        this.cancelResizeObserver = addResizeObserver(
            this.containerElementRef.current,
            throttleWrapper(this.resetListStyle),
            { direction: 'x' }
        )
    }

    componentDidUpdate(prevProps: CascaderProps) {
        this.resetListStyle()

        if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || [])

        if (prevProps.data !== this.props.data) this.datum.setData(this.props.data)
    }

    componentWillUnmount() {
        this.cancelResizeObserver()
    }

    keygen = ({ data, parentKey = '', index }: KeygenParams) => {
        const { keygen } = this.props

        if (typeof keygen === 'function') return keygen(data, parentKey)

        if (keygen) return data[keygen]

        return parentKey + (parentKey ? ',' : '') + index
    }

    bindClickAway = () => {
        document.addEventListener('mousedown', this.handleClickDocumentAway, true)
    }

    clearClickAway = () => {
        document.removeEventListener('mousedown', this.handleClickDocumentAway, true)
    }

    handleClickDocumentAway = (e: MouseEvent) => {
        const desc = isDescendent(e.target as HTMLElement, this.cascaderId)

        if (desc) return

        this.props.onBlur()

        this.handleFocusChange(false)
    }

    handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()

            this.handleFocusChange(!this.state.focus)
        }

        if (e.keyCode === 9) {
            this.props.onBlur()

            if (this.state.focus) {
                this.handleFocusChange(false)
            }
        }
    }

    handleFocusChange = (focus: boolean, e?) => {
        const { disabled, height, onCollapse, position } = this.props

        if (disabled === true || focus === this.state.focus) return

        /** 点击关闭按钮 */
        if (focus && e && e.target.classList.contains(cascaderClass('close'))) return

        let newPosition = position

        if (!position) {
            const windowHeight = docSize.height

            const bottom = height + this.containerElementRef.current.getBoundingClientRect().bottom

            if (bottom > windowHeight) newPosition = 'drop-up'
        }

        if (onCollapse) onCollapse(focus)

        this.setState({ focus, position: newPosition || 'drop-down' })

        if (focus) {
            this.bindClickAway()
        } else {
            this.clearClickAway()
        }
    }

    handleClear = () => {
        const { mode, onChange } = this.props

        if (mode === undefined) {
            this.setState({ path: [] })
        } else {
            this.datum.setValue([])
        }

        this.props.onBlur()

        onChange([])

        runInNextFrame(() => {
            this.handleFocusChange(false)
        })
    }

    handlePathChange = (id: React.Key, fromListData: T, path: React.Key[]) => {
        const { childrenKey, finalDismiss } = this.props

        if (fromListData) {
            const leaf = !fromListData[childrenKey] || fromListData[childrenKey].length === 0

            if (finalDismiss && leaf) this.handleFocusChange(false)
        }

        this.setState({ path: [...path, id] })
    }

    resetListStyle = () => {
        if (!this.list) return

        const element = this.list

        const { listStyle } = this.state

        const { data, height } = this.props

        const { width } = element.getBoundingClientRect()

        /** 不能直接使用element的left，因为它会变，导致反复渲染 */
        const { left } = this.containerElementRef.current.getBoundingClientRect()

        if (data.length === 0) {
            if (listStyle.height === 'auto') return

            /** 无数据时，不需要固定高度 直接让placeholder的高度撑开 */
            this.setState({ listStyle: { height: 'auto', width: '100%' } })

            return
        }

        /** 清除从无数据到有数据中 lisStyle中的width 100% */
        if (listStyle.width === '100%') this.setState({ listStyle: { height } })

        if (left + width > docSize.width) {
            if (listStyle.left === 'auto') return

            this.setState({ listStyle: { height, left: 'auto', right: 0 } })
        } else {
            if (listStyle.right === undefined) return

            this.setState({ listStyle: { height } })
        }
    }

    renderList = () => {
        const { data, renderItem, mode, onChange, loader, onItemClick, expandTrigger, childrenKey, text } = this.props

        const { path } = this.state

        const props = {
            datum: this.datum,
            renderItem,
            keygen: this.keygen,
            loader,
            onPathChange: this.handlePathChange,
            onChange,
            onItemClick,
            multiple: mode !== undefined,
            expandTrigger,
            childrenKey,
            text,
        }

        let nextPathData: any[] = data

        return (
            <>
                <CascaderList {...props} key="root" data={data} currentPathActiveId={path[0]} parentId="" path={[]} />
                {path.map((id, index) => {
                    nextPathData = nextPathData?.find((d) => {
                        const nextPathId = this.keygen({ data: d, parentKey: path[index - 1], index })

                        return nextPathId === id
                    })

                    if (nextPathData?.[childrenKey]?.length > 0) {
                        nextPathData = nextPathData[childrenKey]

                        return (
                            <CascaderList
                                {...props}
                                key={id}
                                data={nextPathData}
                                currentPathActiveId={path[index + 1]}
                                parentId={path[index]}
                                path={path.slice(0, index + 1)}
                            />
                        )
                    }

                    return null
                })}
            </>
        )
    }

    renderAbsoluteList = () => {
        const { zIndex, absolute } = this.props
        const { focus, position, listStyle } = this.state

        if (!focus && !this.isRendered) return null

        this.isRendered = true

        const absoluteRootCls = classnames(cascaderClass(focus && 'focus'), selectClass(this.state.position))

        const className = classnames(selectClass('options'), cascaderClass('options'))

        return (
            <AbsoluteList
                rootClass={absoluteRootCls}
                position={position}
                absolute={absolute}
                focus={focus}
                getParentElement={() => this.containerElementRef.current}
                zIndex={zIndex}
            >
                {({ style }) => {
                    const ms = Object.assign({}, style, listStyle)

                    return (
                        <AnimationList
                            lazyDom
                            style={ms}
                            show={focus}
                            data-id={this.cascaderId}
                            className={className}
                            animationTypes={['fade', 'scale-y']}
                            duration="fast"
                            display="inline-flex"
                            getRef={(list) => {
                                this.list = list
                            }}
                            onTransitionEnd={this.resetListStyle}
                        >
                            {this.renderList()}
                        </AnimationList>
                    )
                }}
            </AbsoluteList>
        )
    }

    render() {
        const { placeholder, disabled, spinProps, onFocus, onBlur, keygen, ...other } = this.props

        const { focus, position } = this.state

        const className = classnames(
            cascaderClass(
                '_',
                focus && 'focus',
                other.mode !== undefined && 'multiple',
                disabled === true && 'disabled'
            ),
            selectClass(position)
        )

        return (
            <div
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={disabled === true ? -1 : 0}
                className={className}
                onFocus={onFocus}
                ref={this.containerElementRef}
                onClick={this.handleFocusChange.bind(this, true)}
                onKeyDown={this.handleKeyDown}
                data-id={this.cascaderId}
            >
                <Result
                    {...other}
                    multiple={other.mode !== undefined}
                    datum={this.datum}
                    placeholder={placeholder}
                    onClear={this.handleClear}
                    onPathChange={this.handlePathChange}
                    disabled={disabled}
                    cascaderId={this.cascaderId}
                />

                {this.renderAbsoluteList()}
            </div>
        )
    }
}

export default Cascader
