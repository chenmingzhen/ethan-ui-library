import React, { useEffect, useRef } from 'react'
import useSafeState from '@/hooks/useSafeState'
import { tabsClass } from '@/styles'
import { useUpdateEffect } from 'react-use'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { TabsHeaderProps } from './type'
import Button from '../Button'
import Tab from './Tab'
import icons from '../icons'
import Dropdown from '../Dropdown'
import useHideTabs from './hooks/useHideTabs'

// 点击Tab留出的空隙
const REDUNDANT = 30

const Header: React.FC<TabsHeaderProps> = (props) => {
    const [attribute, setAttribute] = useSafeState(0)

    const [overflow, setOverflow] = useSafeState(false)

    const [attributeString, setAttributeString] = useSafeState('')

    const {
        isVertical,
        onChange,
        onCollapse,
        shape,
        tabs,
        tabBarExtraContent,
        currentActive,
        overflowIcon,
        collapsed,
        hrBorderColor,
    } = props

    const innerElementRef = useRef<HTMLDivElement>()

    const scrollElementRef = useRef<HTMLDivElement>()

    const tabsWrapperElementRef = useRef<HTMLDivElement>()

    const navElementRef = useRef<HTMLDivElement>()

    const navInitHW = useRef<{ height?: string; width?: string }>({})

    const hasBindWheel = useRef(false)

    useEffect(() => {
        if (!navElementRef.current) return

        const { height, width } = navElementRef.current.style

        navInitHW.current.height = height

        navInitHW.current.width = width
    }, [shape])

    useEffect(() => {
        setPosition()
    }, [isVertical, attribute])

    useEffect(resetNavPosition, [currentActive, shape, attribute])

    useEffect(() => {
        window.addEventListener('resize', resetNavPosition)

        return () => {
            window.removeEventListener('resize', resetNavPosition)
        }
    }, [isVertical, shape, currentActive])

    useUpdateEffect(() => {
        resetNavPosition(true)
    }, [isVertical])

    useEffect(() => {
        function onWheel(e: WheelEvent) {
            e.preventDefault()

            const { pixelY } = normalizeWheel(e)

            computedAttribute(pixelY)
        }

        if ((overflow || attribute > 0) && !hasBindWheel.current && innerElementRef.current) {
            innerElementRef.current.addEventListener('wheel', onWheel, { passive: false })

            hasBindWheel.current = true

            return () => {
                if (!innerElementRef.current) return

                innerElementRef.current.removeEventListener('wheel', onWheel)

                hasBindWheel.current = false
            }
        }
    }, [overflow, attribute])

    const { dropDownData, tabMoveMap } = useHideTabs({
        scrollElementRef,
        innerElementRef,
        tabs,
        isVertical,
        attribute,
        collapsible: !!onCollapse,
    })

    function computedAttribute(data) {
        const innerAttribute = innerElementRef.current[`client${attributeString}`]

        const scrollAttribute = scrollElementRef.current[`client${attributeString}`]

        // 计算滑动距离
        let newAttribute = attribute + data
        // 距离超过左|顶
        if (newAttribute < 0) newAttribute = 0
        // 距离超过右|底
        if (newAttribute + innerAttribute > scrollAttribute) newAttribute = scrollAttribute - innerAttribute

        setAttribute(newAttribute)
    }

    function resetNavPosition(reset?: boolean | UIEvent) {
        if (!navElementRef.current) return

        if (shape !== 'line' && shape !== 'dash') return

        const activeIndex = tabs.findIndex(({ id }) => id === currentActive)

        const itemElement = scrollElementRef.current.children[activeIndex] as HTMLElement

        if (!itemElement) return

        const bar = navElementRef.current

        if (reset) {
            bar.style.height = navInitHW.current.height
            bar.style.width = navInitHW.current.width
        }

        if (isVertical) {
            const itemOffsetHeight = itemElement.offsetHeight

            const itemOffsetTop = itemElement.offsetTop

            if (shape === 'line') {
                bar.style.height = `${itemOffsetHeight}px`

                bar.style.transform = `translate(0px,${itemOffsetTop}px)`
            } else {
                bar.style.height = `${itemOffsetHeight / 3}px`

                bar.style.transform = `translate(0px,${itemOffsetTop + itemOffsetHeight / 3}px)`
            }
        } else {
            const itemOffsetWidth = itemElement.offsetWidth

            const itemOffsetLeft = itemElement.offsetLeft

            if (shape === 'line') {
                bar.style.width = `${itemOffsetWidth}px`

                bar.style.transform = `translate(${itemOffsetLeft}px,0px)`
            } else {
                bar.style.width = `${itemOffsetWidth / 3}px`

                bar.style.transform = `translate(${itemOffsetLeft + itemOffsetWidth / 3}px,0px)`
            }
        }
    }

    function setPosition() {
        if (!innerElementRef.current) return

        const newAttributeString = isVertical ? 'Height' : 'Width'

        const innerAttribute = innerElementRef.current[`client${newAttributeString}`]

        const scrollAttribute = scrollElementRef.current[`client${newAttributeString}`]

        const newOverflow = scrollAttribute > attribute + innerAttribute

        setOverflow(newOverflow)

        setAttributeString(newAttributeString)
    }

    function handleClick(id: string | number, isActive: boolean) {
        if (isActive) return

        onChange?.(id)
    }

    function handleMove(lt) {
        const innerAttribute = innerElementRef.current[`client${attributeString}`]

        const data = lt ? -innerAttribute : innerAttribute

        computedAttribute(data)
    }

    function handleDropdownClick(tab) {
        const method = tabMoveMap.get(tab.key)

        method?.()
    }

    function moveToCenter(tabRect: DOMRect, last: boolean, first: boolean) {
        const positions = isVertical ? ['top', 'bottom'] : ['left', 'right']

        const rect = innerElementRef.current.getBoundingClientRect()
        // 比较Tab与容器的位置

        if (tabRect[positions[0]] < rect[positions[0]]) {
            const newAttribute = attribute - (rect[positions[0]] - tabRect[positions[0]] + (first ? 0 : REDUNDANT))

            setAttribute(newAttribute)
        } else if (tabRect[positions[1]] > rect[positions[1]]) {
            const newAttribute =
                attribute +
                tabRect[positions[1]] -
                rect[positions[1]] +
                // 如果为没有偏差值 设置偏差值后 左边会出现箭头 需要加上箭头的宽度
                (attribute === 0 ? 30 : 0) +
                (last ? 0 : REDUNDANT)

            setAttribute(newAttribute)
        }
    }

    function buildNav() {
        if (shape !== 'line' && shape !== 'dash') return null

        return <div ref={navElementRef} className={tabsClass('nav')} />
    }

    if (shape === 'button') {
        return (
            <Button.Group>
                {tabs.map(({ id, isActive, disabled, tab }) => (
                    <Button
                        key={id}
                        onClick={isActive ? undefined : onChange.bind(this, id)}
                        className={tabsClass(isActive && 'button-active')}
                        disabled={disabled}
                    >
                        {tab}
                    </Button>
                ))}
            </Button.Group>
        )
    }

    const position = isVertical ? 'Top' : 'Left'

    const showBorder = shape !== 'dash'

    return (
        <div className={tabsClass('header')}>
            <div ref={tabsWrapperElementRef} className={tabsClass('header-tabs')}>
                {onCollapse && (
                    <span className={tabsClass('indicator', collapsed && 'collapsed')} onClick={onCollapse}>
                        {icons.AngleRight}
                    </span>
                )}

                {attribute > 0 && (
                    <div onClick={handleMove.bind(this, true)} className={tabsClass('scroll-prev')}>
                        {icons.AngleLeft}
                    </div>
                )}

                {/* 容器 */}
                <div ref={innerElementRef} className={tabsClass('inner')}>
                    {/* 实际内容 */}
                    <div
                        ref={scrollElementRef}
                        style={{ [`margin${position}`]: -attribute }}
                        className={tabsClass('scroll')}
                    >
                        {tabs.map(({ tab, id, ...other }) => (
                            <Tab
                                {...other}
                                key={id}
                                id={id}
                                moveToCenter={moveToCenter}
                                onClick={handleClick}
                                tabMoveMap={tabMoveMap}
                            >
                                {tab}
                            </Tab>
                        ))}

                        {buildNav()}
                    </div>
                </div>

                {overflowIcon === 'scroll' && overflow && (
                    <div onClick={handleMove.bind(this, false)} className={tabsClass('scroll-next')}>
                        {isVertical ? icons.AngleRight : icons.AngleRight}
                    </div>
                )}

                {overflowIcon === 'more' && overflow && (
                    <Dropdown
                        data={dropDownData}
                        absolute
                        className={tabsClass('drop-down', isVertical && 'vertical')}
                        listClassName={tabsClass('drop-down-list')}
                        animation={false}
                        onClick={handleDropdownClick}
                        placeholder={<div className={tabsClass('more')}>{icons.Ellipsis}</div>}
                        showCaret={false}
                        buttonProps={{ type: 'link', style: { height: '100%', padding: 0, border: 0, width: '100%' } }}
                    />
                )}
            </div>

            {tabBarExtraContent && <div className={tabsClass('extra')}>{tabBarExtraContent}</div>}

            {showBorder && <div className={tabsClass('hr')} style={{ borderColor: hrBorderColor }} />}
        </div>
    )
}

export default React.memo(Header)
