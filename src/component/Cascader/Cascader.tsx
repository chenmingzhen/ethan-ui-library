import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { getUidStr } from '@/utils/uid'
import TreeDatum, { KeygenParams } from '@/utils/Datum/Tree'
import { cascaderClass, selectClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { isDescendent } from '@/utils/dom/element'
import { runInNextFrame } from '@/utils/nextFrame'
import { getLocale } from '@/locale'
import { KeyboardKey } from '@/utils/keyboard'
import { styles } from '@/utils/style/styles'
import { getListPortalStyle } from '@/utils/position'
import Result from './Result'
import CascaderList from './List'
import { CascaderState, CascaderProps } from './type'
import AnimationList from '../List'
import Portal from '../Portal'

class Cascader<T> extends PureComponent<CascaderProps, CascaderState> {
    static defaultProps = {
        clearable: true,
        expandTrigger: 'click',
        height: 300,
        data: [],
        childrenKey: 'children',
        text: {},
    }

    datum: TreeDatum

    isRendered = false

    cascaderId = getUidStr()

    containerElementRef = React.createRef<HTMLDivElement>()

    constructor(props) {
        super(props)

        this.state = {
            focus: false,
            path: [],
            position: 'drop-down',
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
        super.componentDidMount()

        /** 更新无数据的DOM宽度 */
        if (!this.props.data?.length) this.forceUpdate()
    }

    componentDidUpdate(prevProps: CascaderProps) {
        if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || [])

        if (prevProps.data !== this.props.data) this.datum.setData(this.props.data)
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
        if (e.key === KeyboardKey.Enter) {
            e.preventDefault()

            this.handleFocusChange(!this.state.focus)
        } else if (e.key === KeyboardKey.Escape) {
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

    renderList = () => {
        const { data, renderItem, mode, onChange, loader, onItemClick, expandTrigger, childrenKey, text } = this.props

        if (!data?.length) {
            return <span>{text?.noData || getLocale('noData')}</span>
        }

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
        const { zIndex, portal, data } = this.props
        const { focus, position } = this.state

        if (!focus && !this.isRendered) return null

        this.isRendered = true

        const portalRootCls = classnames(cascaderClass(focus && 'focus'), selectClass(this.state.position))

        const className = classnames(selectClass('options'), cascaderClass('options', !data?.length && 'no-data'))

        let width

        if (!data?.length) {
            width = this.containerElementRef.current
                ? this.containerElementRef.current.getBoundingClientRect().width
                : 0
        }

        const rect = this.containerElementRef.current?.getBoundingClientRect()

        const ms = styles({ zIndex, width }, portal && getListPortalStyle(rect, position))

        return (
            <Portal rootClass={portalRootCls} portal={portal}>
                <AnimationList
                    lazyDom
                    show={focus}
                    data-id={this.cascaderId}
                    className={className}
                    animationTypes={['fade', 'scale-y']}
                    duration="fast"
                    display="inline-flex"
                    style={ms}
                >
                    {this.renderList()}
                </AnimationList>
            </Portal>
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
