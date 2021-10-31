import React from 'react'
import classnames from 'classnames'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { menuClass } from '@/styles'
import { pull } from '@/utils/array'
import { deepClone } from '@/utils/clone'
import ScrollBar from '../Scroll/Bar'
import List from './List'
import { Provider } from './context'
import { BaseData, MenuContext, MenuProps, UpdateActive, UpdateInPath, UpdateOpen } from './type'
import { getOption } from './util'

const modeDirection = {
    'vertical-auto': 'y',

    vertical: 'y',

    horizontal: 'x',
}

interface IMenuProps extends MenuProps {
    level?: number
}

interface MenuState {
    activeKey?: string

    scrollTop?: number

    scrollLeft?: number

    openKeys?: (number | string)[]

    hasOpen?: boolean
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

        style: {},
    }

    providerValue: MenuContext

    itemsUpdateActiveCallback = new Map<string, UpdateActive>()

    itemsUpdateOpenCallback = new Map<string, UpdateOpen>()

    itemsUpdateInPathCallback = new Map<string, UpdateInPath>()

    innerIdToOuterKeyMap = new Map<string, string | number>()

    container: HTMLDivElement

    wrapper: HTMLDivElement

    rootElement: HTMLDivElement

    scrollTimer: NodeJS.Timeout

    scrollCache = 0

    get openKeys() {
        const { openKeys } = this.props

        if (openKeys) return openKeys

        return this.state.openKeys
    }

    constructor(props: MenuProps) {
        super(props)

        this.state = {
            activeKey: '',
            scrollTop: 0,
            scrollLeft: 0,
            openKeys: [],
            hasOpen: false,
        }

        this.providerValue = {
            bindItem: this.bindItem,

            unbindItem: this.unbindItem,

            checkActive: this.checkActive,

            checkInPath: this.checkInPath,

            checkOpen: this.checkOpen,
        }
    }

    componentDidMount = () => {
        const outerKeys = this.props.defaultOpenKeys

        const { defaultActiveKey } = this.props

        const initKeys = []

        let activeId = ''

        for (const [id, key] of this.innerIdToOuterKeyMap) {
            for (const outerKey of outerKeys) {
                if (outerKey === key) {
                    initKeys.push(id)
                }

                if (key === defaultActiveKey) {
                    activeId = id
                }
            }
        }

        this.setState({ openKeys: initKeys, activeKey: activeId }, this.updateState)
    }

    componentDidUpdate = () => {
        this.updateState()
    }

    componentWillUnmount = () => {
        this.container.removeEventListener('wheel', this.handleWheel)
    }

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
                    onScroll={this.handleScroll.bind(this, 'Left')}
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
                onScroll={this.handleScroll.bind(this, 'Top')}
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
                            rootMode={mode}
                        />
                    </Provider>
                </div>

                {showScroll && this.renderScrollBar()}
            </div>
        )
    }

    bindRootElement = (el: HTMLDivElement) => {
        this.container = el

        this.wrapper = el?.querySelector?.(`.${menuClass('wrapper')}`)

        this.rootElement = el?.querySelector?.(`.${menuClass('root')}`)
    }

    bindItem = (id: string, key, updateActive: UpdateActive, updateOpen: UpdateOpen, updateInPath: UpdateInPath) => {
        this.itemsUpdateActiveCallback.set(id, updateActive)

        this.itemsUpdateOpenCallback.set(id, updateOpen)

        this.itemsUpdateInPathCallback.set(id, updateInPath)

        this.innerIdToOuterKeyMap.set(id, key)
    }

    unbindItem(id: string) {
        this.itemsUpdateActiveCallback.delete(id)

        this.itemsUpdateOpenCallback.delete(id)

        this.itemsUpdateInPathCallback.delete(id)

        this.innerIdToOuterKeyMap.delete(id)
    }

    checkActive = (id: string) => {
        return id === this.state.activeKey
    }

    checkOpen = (id: string) => {
        return this.openKeys?.includes(id)
    }

    checkInPath = (id: string) => {
        const { activeKey } = this.state

        return activeKey.indexOf(id) > -1
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
        const { activeKey } = this.state

        for (const [, update] of this.itemsUpdateActiveCallback) {
            update(activeKey)
        }
    }

    updateOpen = () => {
        for (const [, update] of this.itemsUpdateOpenCallback) {
            update()
        }

        const transformKeys = Array.from(this.innerIdToOuterKeyMap.keys())

        const hasOpen = this.openKeys.filter(key => transformKeys.find(it => it === key)).length > 0

        this.setState({ hasOpen })
    }

    updateInPath = () => {
        for (const [, update] of this.itemsUpdateInPathCallback) {
            update()
        }
    }

    toggleOpenKeys = (id, open: boolean) => {
        let newOpenKeys = deepClone(this.openKeys)

        if (!open) {
            newOpenKeys = pull(newOpenKeys, id)
        } else {
            newOpenKeys.push(id)
        }

        const { onOpenChange } = this.props

        if (onOpenChange) {
            const outerKeys = Array.from(this.innerIdToOuterKeyMap.values())

            onOpenChange(outerKeys)
        }

        this.setState({ openKeys: newOpenKeys, hasOpen: newOpenKeys.length > 0 })
    }

    handleWheel = e => {
        const { mode } = this.props

        const { key, pos } = getOption(mode)

        const wheel = normalizeWheel(e)

        const scrollPos = `scroll${pos}` as keyof Pick<MenuState, 'scrollLeft' | 'scrollTop'>

        const size = this.container.getBoundingClientRect()[key]

        const rootSize = this.rootElement.getBoundingClientRect()[key]

        const scrollSize = rootSize - size

        /** X方向值始终为0 同一使用Y direction */
        const percent = (this.wrapper[scrollPos] + wheel.pixelY) / scrollSize

        this.setState({ [scrollPos]: percent > 1 ? 1 : percent < 0 ? 0 : percent })

        e.preventDefault()

        /** 平滑滚动计算 */

        if (this.scrollTimer) clearInterval(this.scrollTimer)

        /** X方向值始终为0 同一使用Y direction */
        this.scrollCache = wheel.pixelY

        const { scrollCache } = this

        const targetValue =
            scrollCache > 0
                ? Math.min(this.wrapper[scrollPos] + scrollCache, scrollSize)
                : Math.max(this.wrapper[scrollPos] + scrollCache, 0)

        this.scrollTimer = setInterval(() => {
            if (this.wrapper[scrollPos] === targetValue || !scrollCache) {
                this.scrollCache = 0

                clearInterval(this.scrollTimer)

                this.scrollTimer = null

                return
            }

            const computedValue = this.wrapper[scrollPos] + scrollCache / 8

            if (scrollCache > 0) {
                this.wrapper[scrollPos] = Math.min(computedValue, targetValue)
            } else {
                this.wrapper[scrollPos] = Math.max(computedValue, targetValue)
            }
        }, 10)
    }

    handleClick = (id, data) => {
        const { onClick } = this.props

        this.setState({ activeKey: id })

        onClick?.(data)
    }

    handleScroll = (pos: 'Top' | 'Left', offset: number) => {
        const sizeKey = pos === 'Top' ? 'height' : 'width'

        const size = this.container.getBoundingClientRect()[sizeKey]

        const scroll = this.rootElement.getBoundingClientRect()[sizeKey]

        const scrollPos = `scroll${pos}` as keyof Pick<MenuState, 'scrollLeft' | 'scrollTop'>

        this.wrapper[scrollPos] = offset * (scroll - size)

        this.setState({ [scrollPos]: offset })
    }
}

export default Menu
