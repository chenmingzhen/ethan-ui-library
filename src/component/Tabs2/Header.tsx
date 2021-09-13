import React, { useEffect, useRef } from 'react'
import useSafeState from '@/hooks/useSafeState'
import { tabsClass } from '@/styles'
import { TabsHeaderProps } from './type'
import Button from '../Button'
import Tab from './Tab'
import icons from '../icons'

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
    } = props

    const innerElementRef = useRef<HTMLDivElement>()

    const scrollElementRef = useRef<HTMLDivElement>()

    const tabsWrapperElementRef = useRef<HTMLDivElement>()

    const navElementRef = useRef<HTMLDivElement>()

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

        console.log(getVisibleIndex())
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

    // TODO 获取可视区的索引
    function getVisibleIndex() {
        let startIndex = 0

        let endIndex = 0

        const pos = isVertical ? 'top' : 'left'

        if (!attribute) {
            startIndex = 0
        } else {
            for (let i = 0; i < tabs.length; i++) {
                if (attribute < scrollElementRef.current?.children[i]?.[pos]) {
                    startIndex = i

                    break
                }
            }
        }

        for (let i = tabs.length; i > -1; i--) {
            if (
                innerElementRef.current.clientWidth + scrollElementRef.current?.children[startIndex]?.[pos] >
                scrollElementRef.current?.children[i]?.[pos]
            ) {
                endIndex = i

                break
            }
        }

        return { startIndex, endIndex }
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
                                <Tab {...other} key={id} id={id} moveToCenter={moveToCenter} onClick={handleClick}>
                                    {tab}
                                </Tab>
                            )
                        })}

                        {buildNav()}
                    </div>
                </div>

                {overflow && (
                    <div onClick={handleMove.bind(this, false)} className={tabsClass('scroll-next')}>
                        {isVertical ? icons.AngleRight : icons.AngleRight}
                    </div>
                )}
            </div>

            {tabBarExtraContent && <div className={tabsClass('extra')}>{tabBarExtraContent}</div>}

            {showBorder && <div style={{ borderColor: String(border) }} className={tabsClass('hr')} />}
        </div>
    )
}

export default React.memo(Header)
