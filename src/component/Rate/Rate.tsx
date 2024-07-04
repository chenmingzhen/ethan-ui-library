import useMergedValue from '@/hooks/useMergedValue'
import { rateClass } from '@/styles'
import { getParent } from '@/utils/dom/element'
import { setTransformProp } from '@/utils/dom/translate'
import { range } from '@/utils/numbers'
import { styles } from '@/utils/style/styles'
import classnames from 'classnames'
import React, { useMemo, useRef } from 'react'
import useSafeState from '@/hooks/useSafeState'
import { RateProps } from './type'

const MIN_SIZE = 12

const Rate: React.FC<RateProps> = function (props) {
    const {
        defaultValue,
        onChange,
        size = 20,
        className,
        style,
        disabled,
        max = 5,
        allowHalf,
        background,
        repeat = true,
        text = [],
        front,
        clearable,
    } = props
    const [hover, updateHover] = useSafeState(0)
    const [highlight, updateHighlight] = useSafeState(0)
    const [value, updateValue] = useMergedValue({
        defaultStateValue: 0,
        options: {
            defaultValue,
            value: props.value,
            onChange(nextValue) {
                if (onChange) {
                    onChange(nextValue)
                }
            },
        },
    })
    const highlightTimer = useRef<NodeJS.Timeout>()
    const scale = size >= MIN_SIZE ? undefined : setTransformProp(`scale(${size / MIN_SIZE})`)

    const iconSizeStyle = useMemo<React.CSSProperties>(() => {
        if (!size) return undefined

        const parsed = Math.max(MIN_SIZE, size)

        return { width: parsed, fontSize: parsed }
    }, [size])

    function handleMouseLeave() {
        updateHover(0)
    }

    function handleRateClick(nextValue: number, e: React.MouseEvent<HTMLSpanElement>) {
        if (allowHalf && getParent(e.target, `.${rateClass('allow-half')}`)) {
            nextValue -= 0.5
        }

        if (clearable && nextValue === value) {
            nextValue = 0
            updateHover(0)
        }

        updateValue(nextValue)
        updateHighlight(nextValue)

        // 高亮动画
        if (highlightTimer.current) {
            clearTimeout(highlightTimer.current)

            highlightTimer.current = null
        }

        highlightTimer.current = setTimeout(() => {
            updateHighlight(0)
        }, 300)
    }

    function handleMove(nextHover: number, e: React.MouseEvent) {
        const { x, width } = (e.target as HTMLElement).getBoundingClientRect()

        nextHover -= x + width / 2 > e.clientX ? 0.5 : 0

        updateHover(nextHover)
    }

    function handleHover(nextHover: number) {
        updateHover(nextHover)
    }

    function buildIcon(icons: React.ReactNode | React.ReactNode[], i: number, isBg = false) {
        const remain = shownValue - i

        let icon

        if (!Array.isArray(icons)) {
            icon = icons
        } else {
            icon = icons[repeat ? shownValue - 1 : i]

            if (!icon) icon = icons[icons.length - 1]
        }

        if (remain <= 0 || remain >= 1 || isBg) return icon

        /** 半选 */
        return (
            <span
                style={{ width: `${remain * 100}%`, display: 'block', overflow: 'hidden', fontSize: 'inherit' }}
                className={allowHalf && rateClass('allow-half')}
            >
                {icon}
            </span>
        )
    }

    const shownValue = hover === 0 ? value : hover
    const cls = classnames(rateClass('_', className))
    const ms = styles(style, scale)

    return (
        <div className={cls} style={ms} onMouseLeave={handleMouseLeave}>
            <div className={rateClass('background')}>
                {range(max).map((index) => (
                    <span
                        key={index}
                        style={styles(
                            {
                                visibility: !allowHalf && !disabled && shownValue > index ? 'hidden' : 'visible',
                            },
                            iconSizeStyle
                        )}
                    >
                        {buildIcon(background, index, true)}
                    </span>
                ))}
            </div>

            {disabled ? (
                <div className={rateClass('static')}>
                    {range(max).map((v) => (
                        <span key={v} style={iconSizeStyle}>
                            {value > v && buildIcon(front, v)}
                        </span>
                    ))}
                    <span className={rateClass('text')}>{text[Math.ceil(value) - 1]}</span>
                </div>
            ) : (
                <div className={rateClass('front')}>
                    {range(max).map((v) => (
                        <span
                            key={v}
                            onClick={handleRateClick.bind(this, v + 1)}
                            onMouseMove={allowHalf ? handleMove.bind(this, v + 1) : undefined}
                            onMouseEnter={!allowHalf ? handleHover.bind(this, v + 1) : undefined}
                            style={iconSizeStyle}
                        >
                            {shownValue > v ? buildIcon(front, v) : <span>&nbsp;</span>}
                            {/* 点击后的动画 */}
                            {highlight === v + 1 && <i className={rateClass('highlight')}>{buildIcon(front, v)}</i>}
                        </span>
                    ))}
                    <span className={rateClass('text')}>{text[Math.ceil(shownValue) - 1]}</span>
                </div>
            )}
        </div>
    )
}

Rate.displayName = 'EthanRate'

export default React.memo(Rate)
