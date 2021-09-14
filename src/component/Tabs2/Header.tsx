import React, { useEffect, useRef } from 'react'
import useSafeState from '@/hooks/useSafeState'
import { tabsClass } from '@/styles'
import ReactDOM from 'react-dom'
import { planeClass } from '@/styles/spin'
import { TabsHeaderProps } from './type'
import Button from '../Button'
import Tab from './Tab'
import icons from '../icons'
import Dropdown from '../Dropdown'
import useHideTabs from './hooks/useHideTabs'

// 点击Tab留出的空隙
const REDUNDANT = 30

const Header: React.FC<TabsHeaderProps> = props => {
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
        border,
        innerPosition,
        rightOverflow,
    } = props

    const innerElementRef = useRef<HTMLDivElement>()

    const scrollElementRef = useRef<HTMLDivElement>()

    const tabsWrapperElementRef = useRef<HTMLDivElement>()

    const navElementRef = useRef<HTMLDivElement>()

    const tabMethodMap = useRef(new Map<number, Function>())

    useEffect(() => {
        setPosition()
    }, [isVertical, attribute])

    useEffect(resetNavPosition, [currentActive, shape, attribute])

    useEffect(() => {
        window.addEventListener('resize', resetNavPosition)

        return () => {
            window.removeEventListener('resize', resetNavPosition)
        }
    }, [innerPosition, isVertical, shape, currentActive])

    const { hideTabs } = useHideTabs({ scrollElementRef, innerElementRef, tabs, isVertical, attribute })

    const dropDownData = hideTabs.map(tab => {
        return {
            content: tab.tab,
            disabled: tab.disabled,
            onClick() {
                const method = tabMethodMap.current.get(tab.id)
                console.log('1111', method)
                method?.()
            },
        }
    })

    function resetNavPosition() {
        if (!navElementRef.current) return

        if (shape !== 'line' && shape !== 'dash') return

        const itemElement: HTMLElement = scrollElementRef.current.children[currentActive]

        if (!itemElement) return

        const bar = navElementRef.current

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
        const scrollAttribute = scrollElementRef.current[`client${attributeString}`]

        // 计算滑动距离
        let newAttribute = attribute + (lt ? -innerAttribute : innerAttribute)
        // 距离超过左|顶
        if (newAttribute < 0) newAttribute = 0
        // 距离超过右|底
        if (newAttribute + innerAttribute > scrollAttribute) newAttribute = scrollAttribute - innerAttribute

        setAttribute(newAttribute)
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
                {tabs.map(({ id, isActive, disabled, tab }) => {
                    return (
                        <Button
                            key={id}
                            onClick={isActive ? undefined : onChange.bind(this, id)}
                            className={tabsClass(isActive && 'button-active')}
                            disabled={disabled}
                        >
                            {tab}
                        </Button>
                    )
                })}
            </Button.Group>
        )
    }

    const position = isVertical ? 'Top' : 'Left'

    const showBorder = shape !== 'bordered' && shape !== 'dash'

    return (
        <div className={tabsClass('header')}>
            <div ref={tabsWrapperElementRef} className={tabsClass('header-tabs')}>
                {attribute > 0 && (
                    <div onClick={handleMove.bind(this, true)} className={tabsClass('scroll-prev')}>
                        {icons.AngleLeft}
                    </div>
                )}

                {/* 容器 */}
                <div ref={innerElementRef} className={tabsClass('inner')} style={{ textAlign: innerPosition }}>
                    {/* 实际内容 */}
                    <div
                        ref={scrollElementRef}
                        style={{ [`margin${position}`]: -attribute }}
                        className={tabsClass('scroll')}
                    >
                        {tabs.map(({ tab, id, ...other }) => {
                            return (
                                <Tab
                                    {...other}
                                    key={id}
                                    id={id}
                                    moveToCenter={moveToCenter}
                                    onClick={handleClick}
                                    tabMethodMap={tabMethodMap}
                                >
                                    {tab}
                                </Tab>
                            )
                        })}

                        {buildNav()}
                    </div>
                </div>

                {rightOverflow === 'scroll' && overflow && (
                    <div onClick={handleMove.bind(this, false)} className={tabsClass('scroll-next')}>
                        {isVertical ? icons.AngleRight : icons.AngleRight}
                    </div>
                )}

                {rightOverflow === 'more' && overflow && (
                    <Dropdown
                        data={dropDownData}
                        absolute
                        className={tabsClass('drop-down')}
                        listClassName={tabsClass('drop-down-list')}
                        animation={false}
                        renderPlaceholder={(_, __, onClick) => {
                            return (
                                <div className={tabsClass('more')} onClick={onClick}>
                                    {icons.Ellipsis}
                                </div>
                            )
                        }}
                    />
                )}
            </div>

            {tabBarExtraContent && <div className={tabsClass('extra')}>{tabBarExtraContent}</div>}

            {showBorder && <div style={{ borderColor: String(border) }} className={tabsClass('hr')} />}
        </div>
    )
}

export default React.memo(Header)
