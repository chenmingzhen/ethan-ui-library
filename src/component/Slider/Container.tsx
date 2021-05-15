// @ts-nocheck
import React, { useRef, memo, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '@/utils/proptypes'
import { sliderClass } from '@/styles'
import Slider from './Slider'
import { perToValue } from './utils'

const Container = props => {
    const innerElement = useRef()
    // ---------------------------------method and computed---------------------------------------
    const computedVal = useMemo(() => {
        const { range, value, scale } = props
        // 起始值
        const from = scale[0]
        if (!range) return value || from

        let val = value
        if (range && !Array.isArray(value)) val = [from, from]
        if (val[0] > val[1]) val = [val[1], val[0]]
        return val
    }, [props.range, props.value, props.scale])

    const bindElement = useCallback(el => {
        innerElement.current = el
    }, [])

    const handleClick = useCallback(
        e => {
            // 点击原点指示器不操作
            if (e.target.className.indexOf(sliderClass('indicator')) >= 0) return
            if (props.disabled) return

            const { scale, step, vertical, range } = props
            const rect = innerElement.current.getBoundingClientRect()
            const per = vertical ? 1 - (e.clientY - rect.top) / rect.height : (e.clientX - rect.left) / rect.width

            const val = perToValue(per, scale, step)

            if (!range) {
                props.onChange(val)
                return
            }

            const value = [...computedVal]
            if (val < value[0]) value[0] = val
            else value[1] = val

            props.onChange(value)
        },
        [props.disabled, props.scale, props.step, props.vertical, props.range, props.onChange, computedVal]
    )

    const handleChange = useCallback(
        (index, val) => {
            const { range } = props
            if (!range) {
                props.onChange(val)
                return
            }

            const value = [...computedVal]
            value[index] = val
            props.onChange(value)
        },
        [props.range, props.onChange, computedVal]
    )

    const renderScale = useCallback(() => {
        const { autoHide, formatScale, scale } = props
        if (!formatScale) return null

        return (
            <div className={sliderClass('scale', !autoHide && 'show')}>
                {scale.map((s, i) => (
                    <div key={s}>
                        <span>{formatScale(s, i)}</span>
                    </div>
                ))}
            </div>
        )
    }, [props.autoHide, props.formatScale, props.scale])

    // ---------------------------------render---------------------------------------------------
    const { range, height, style, vertical, ...other } = props
    const className = classnames(
        sliderClass('_', vertical && 'vertical', props.disabled && 'disabled'),
        props.className
    )

    let value = computedVal
    if (!Array.isArray(value)) value = [0, value]

    let newStyle = style
    if (vertical) newStyle = Object.assign({ height }, style)

    return (
        <div style={newStyle} className={className}>
            <div className={sliderClass('background')} />
            <div ref={bindElement} onClick={handleClick} className={sliderClass('inner')}>
                {range && (
                    <Slider
                        {...other}
                        index={0}
                        max={value[1]}
                        onChange={handleChange}
                        value={value[0]}
                        vertical={vertical}
                    />
                )}

                <Slider
                    {...other}
                    index={1}
                    min={value[0]}
                    onChange={handleChange}
                    value={value[1]}
                    vertical={vertical}
                />
            </div>
            {renderScale()}
        </div>
    )
}

Container.propTypes = {
    ...getProps(PropTypes, 'disabled', 'type'),
    range: PropTypes.bool, // 是否显示双滑块
    autoHide: PropTypes.bool, // 是否自动隐藏当前值和刻度
    formatScale: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]), // 格式化显示刻度，为false时，不显示刻度
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    onDrag: PropTypes.func,
    scale: PropTypes.arrayOf(PropTypes.number), // 取值范围，长度 >= 2 的数组
    step: PropTypes.number, // 步长，必须大于等于0；为0时，只能选取 scale 指定的值
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    vertical: PropTypes.bool,
}

Container.defaultProps = {
    height: 200,
    scale: [0, 100],
    step: 1,
    vertical: false,
    formatScale: v => v,
}

export default memo(Container)
