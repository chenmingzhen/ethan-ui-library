import React from 'react'
import classnames from 'classnames'
import { sliderClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import Slider from './Slider'
import { perToValue } from './utils'
import { ISliderContainerProps } from './type'

class SliderContainer extends PureComponent<ISliderContainerProps> {
    static defaultProps = {
        height: 200,
        scale: [0, 100],
        step: 1,
        vertical: false,
        formatScale: (v) => v,
    }

    static displayName = 'EthanSlider'

    innerElement = React.createRef<HTMLDivElement>()

    get computedVal() {
        const { range, value, scale } = this.props

        const from = scale[0]

        if (!range) return value || from

        let val = value

        if (range && !Array.isArray(value)) val = [from, from]

        if (val[0] > val[1]) val = [val[1], val[0]]

        return val as number[]
    }

    handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const { disabled, scale, step, vertical, range, onChange } = this.props
        /** 点击原点指示器不操作 */
        if ((e.target as HTMLDivElement).className.indexOf(sliderClass('indicator')) >= 0) return

        if (disabled) return

        const rect = this.innerElement.current.getBoundingClientRect()

        const per = vertical ? 1 - (e.clientY - rect.top) / rect.height : (e.clientX - rect.left) / rect.width

        const val = perToValue(per, scale, step)

        if (!range && onChange) {
            onChange(val)

            return
        }

        const value = [...(this.computedVal as number[])]

        if (val < value[0]) value[0] = val
        else value[1] = val

        onChange?.(value)
    }

    handleChange = (index: number, val: number) => {
        const { range, onChange } = this.props

        if (!range) {
            onChange(val)
            return
        }

        const value = [...(this.computedVal as number[])]

        value[index] = val

        onChange(value)
    }

    renderScale = () => {
        const { autoHide, formatScale, scale } = this.props

        if (!formatScale) return null

        return (
            <div className={sliderClass('scale', !autoHide && 'show')}>
                {scale.map((s) => (
                    <div key={s}>
                        <span>{formatScale(s)}</span>
                    </div>
                ))}
            </div>
        )
    }

    render() {
        const { vertical, height, disabled, range, ...other } = this.props

        const className = classnames(
            sliderClass('_', vertical && 'vertical', disabled && 'disabled'),
            this.props.className
        )

        const style = vertical ? Object.assign({ height }, this.props.style) : this.props.style

        const value = !Array.isArray(this.computedVal) ? [0, this.computedVal] : this.computedVal

        return (
            <div style={style} className={className}>
                <div className={sliderClass('background')} />
                <div ref={this.innerElement} onClick={this.handleClick} className={sliderClass('inner')}>
                    {range && (
                        <Slider
                            {...other}
                            index={0}
                            max={value[1]}
                            onChange={this.handleChange}
                            value={value[0]}
                            vertical={vertical}
                        />
                    )}

                    <Slider
                        {...other}
                        index={1}
                        min={value[0]}
                        onChange={this.handleChange}
                        value={value[1]}
                        vertical={vertical}
                    />
                </div>

                {this.renderScale()}
            </div>
        )
    }
}

export default SliderContainer
