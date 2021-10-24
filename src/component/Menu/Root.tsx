import React from 'react'
import classnames from 'classnames'
import immer, { enableMapSet } from 'immer'
import { getKey } from '@/utils/uid'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { menuClass } from '@/styles'
import { isArray } from '@/utils/is'
import ScrollBar from '../Scroll/Bar'
import List from './List'
import { Provider } from './context'
import { BaseData, MenuProps } from './type'
import { getOption, keyToMap } from './util'

enableMapSet()

const modeDirection = {
    'vertical-auto': 'y',

    vertical: 'y',

    horizontal: 'x',
}

interface IMenuProps extends MenuProps {
    level?: number
}

interface MenuState {
    activeKey: string | number

    scrollTop: number

    scrollLeft: number

    openKeys: Map<number | string, boolean>

    hasOpen: boolean
}

class Menu extends React.PureComponent<IMenuProps, MenuState> {
    static defaultProps = {
        data: [],

        disabled: d => d.disabled,

        level: 0,

        keygen: 'id',

        mode: 'inline',

        inlineIndent: 24,

        active: () => false,

        defaultOpenKeys: [],

        onClick: () => {},

        theme: 'light',
    }

    providerValue

    items = new Map()

    itemsOpen = new Map()

    itemsInPath = new Map()

    container: HTMLDivElement

    wrapper: HTMLDivElement

    rootElement: HTMLDivElement

    hasToggled = false

    get openKeys() {
        const { openKeys, defaultOpenKeys } = this.props

        if (openKeys) return openKeys

        // 根据是否已经点击后来判断返回的OpenKeys
        return this.hasToggled ? Array.from(this.state.openKeys.keys()) : defaultOpenKeys
    }

    constructor(props) {
        super(props)

        this.state = {
            // 目前所在的Key
            activeKey: null,
            scrollTop: 0,
            scrollLeft: 0,
            openKeys: keyToMap(props.defaultOpenKeys),
            hasOpen: false,
        }

        // 关于绑定 每次刷新组件的时候，执行updateState，执行updateActive，其中在updateXXX中
        // 对item itemsOpen itemsInPath的绑定进行执行，传递对应的check方法与状态给Item Item通过check方法进行判断 actived inPath
        // 通过Context传递给Item
        this.providerValue = {
            bindItem: this.bindItem,
            unbindItem: this.unbindItem,
        }
    }

    componentDidMount = () => {
        this.updateState()
    }

    componentDidUpdate = () => {
        this.updateState()
    }

    componentWillUnmount = () => {
        this.container.removeEventListener('wheel', this.handleWheel)
    }

    bindRootElement = (el: HTMLDivElement) => {
        this.container = el

        this.wrapper = el?.querySelector?.(`.${menuClass('wrapper')}`)

        this.rootElement = el?.querySelector?.(`.${menuClass('root')}`)
    }

    bindItem = (id: string | number, updateActive, updateOpen, updateInPath) => {
        this.items.set(id, updateActive)

        this.itemsOpen.set(id, updateOpen)

        this.itemsInPath.set(id, updateInPath)

        // Item的初始化State中使用
        return [this.checkActive, this.checkOpen, this.checkInPath]
    }

    unbindItem(id: string | number) {
        this.items.delete(id)

        this.itemsOpen.delete(id)

        this.itemsInPath.delete(id)
    }

    checkActive = (id: string | number) => {
        return id === this.state.activeKey
    }

    checkOpen = (id: string | number) => {
        return isArray(this.openKeys) ? this.openKeys.includes(id) : false
    }

    checkInPath = id => {
        return this.itemsInPath.has(id)
    }

    updateState = () => {
        const { mode } = this.props

        this.updateActive()

        this.updateOpen()

        this.updateInPath()

        if (!this.container) return

        const bindMethod = mode !== 'inline' ? this.container.addEventListener : this.container.removeEventListener

        bindMethod.call(this.container, 'wheel', this.handleWheel, { passive: false })
    }

    updateActive = () => {
        for (const [, update] of this.items) {
            update(this.checkActive, this.itemsInPath)
        }
    }

    updateOpen = () => {
        const { data } = this.props

        for (const [, update] of this.itemsOpen) {
            update(this.checkOpen)
        }

        const hasOpen = this.openKeys.filter(key => data.find(it => it.key === key)).length > 0

        this.setState({ hasOpen })
    }

    updateInPath = () => {
        for (const [, update] of this.itemsInPath) {
            update(this.checkInPath)
        }
    }

    /**
     * 设置打开的MenuKeys Item中调用
     * @param id
     * @param open
     */
    toggleOpenKeys = (id, open) => {
        const newOpenKeys = immer(keyToMap(this.openKeys), draft => {
            if (open) {
                draft.set(id, true)
            } else draft.delete(id)
        })

        this.hasToggled = true

        const keys = Array.from(newOpenKeys.keys())

        const { openKeys, onOpenChange } = this.props

        // 用户受控
        if (openKeys) {
            onOpenChange?.(keys)

            return
        }

        this.setState({ openKeys: newOpenKeys, hasOpen: keys.length > 0 })

        onOpenChange?.(keys)
    }

    handleWheel = e => {
        const { mode } = this.props

        const { key, pos, direction } = getOption(mode)

        const wheel = normalizeWheel(e)

        const size = this.container.getBoundingClientRect()[key]

        this.wrapper[`scroll${pos}`] += wheel[`pixel${direction}`]

        const precent = this.wrapper[`scroll${pos}`] / size

        this.setState({ [`scroll${pos}`]: precent > 1 ? 1 : precent })

        e.preventDefault()
    }

    handleClick = (id, data) => {
        const { onClick } = this.props

        // 目前所在的Key
        this.setState({ activeKey: id })

        onClick?.(data)
    }

    handleScroll = (pos: 'Top' | 'Left', offset) => {
        const sizeKey = pos === 'Top' ? 'height' : 'width'

        const size = this.container.getBoundingClientRect()[sizeKey]

        const scroll = this.rootElement.getBoundingClientRect()[sizeKey]

        this.wrapper[`scroll${pos}`] = offset * (scroll - size)

        this.setState({ [`scroll${pos}`]: offset })
    }

    /**
     * 自定义render
     * @param data
     * @returns {null|*}
     */
    renderItem = (data: BaseData) => {
        const { renderItem } = this.props

        return renderItem?.(data) ?? data.title
    }

    renderScrollBar = () => {
        if (!this.rootElement || !this.container) return null

        const { mode } = this.props

        const direction = modeDirection[mode]

        if (!direction) return null

        if (direction === 'x') {
            const { width } = this.container.getBoundingClientRect()

            const scrollWidth = this.rootElement.getBoundingClientRect().width
            // 内容器未大于外容器 不渲染滚动条
            if (scrollWidth <= width) return null

            return (
                <ScrollBar
                    className={menuClass('bar')}
                    length={width}
                    scrollLength={scrollWidth}
                    offset={this.state.scrollLeft}
                    onScroll={this.handleScroll.bind('Top')}
                    direction="x"
                />
            )
        }

        const length = this.container.getBoundingClientRect().height

        const scrollHeight = this.rootElement.getBoundingClientRect().height

        if (scrollHeight < length) return null

        return (
            <ScrollBar
                className={menuClass('bar')}
                forceHeight={length}
                length={length}
                scrollLength={scrollHeight}
                offset={this.state.scrollTop}
                onScroll={this.handleScroll.bind('Left')}
            />
        )
    }

    render() {
        const { data, mode, style, theme, inlineIndent } = this.props

        const isVertical = mode.indexOf('vertical') === 0

        const showScroll = (style.height && isVertical) || mode === 'horizontal'

        const className = classnames(
            menuClass(
                '_',
                isVertical ? 'vertical' : mode,
                theme === 'dark' && 'dark',
                showScroll && 'scroll',
                this.state.hasOpen && 'has-open'
            ),
            this.props.className
        )

        const rootStyle: React.CSSProperties = {}

        if (style.width && mode !== 'horizontal') rootStyle.width = style.width

        let bottomLine = 0

        let topLine = 0

        if (this.container) {
            const rect = this.container.getBoundingClientRect()

            bottomLine = rect.bottom

            topLine = rect.top
        }

        return (
            <div className={className} ref={this.bindRootElement} style={style}>
                <div className={menuClass('wrapper')}>
                    <Provider value={this.providerValue}>
                        <List
                            className={menuClass('root')}
                            data={data}
                            inlineIndent={inlineIndent}
                            level={0}
                            mode={mode}
                            onClick={this.handleClick}
                            path=""
                            renderItem={this.renderItem}
                            open
                            style={rootStyle}
                            toggleOpenKeys={this.toggleOpenKeys}
                            bottomLine={bottomLine}
                            topLine={topLine}
                        />
                    </Provider>
                </div>

                {showScroll && this.renderScrollBar()}
            </div>
        )
    }
}

export default Menu
