// @ts-nocheck
import React, { memo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useMount, useUpdateEffect, usePrevious } from 'react-use'
import { FontAwesome } from '@/component/Icon'
import { avatarClass } from '@/styles'
import fitText from '@/component/Avatar/util'

const NO_STYLE = {}

const HIDDEN_STYLE = {
    opacity: 0,
}

const Avatar = props => {
    const [textScale, setTextScale] = useState(1)
    const [textReady, setTextReady] = useState(false)

    const textNodeRef = useRef()
    const avatarNodeRef = useRef()

    const { size, shape, src, icon, children, bordered, style } = props
    const useImage = !!src
    const useString = !!children

    const prevChildren = usePrevious(children)

    const className = avatarClass('_', props.className, {
        large: size === 'large',
        default: size === 'default',
        small: size === 'small',
        circle: shape === 'circle',
        square: shape === 'square',
        icon: !!icon,
        image: useImage,
        string: useString,
        bordered,
    })

    if (useImage) {
        return (
            <span style={style} className={className}>
                <img className={avatarClass('image-inner')} src={src} alt="avatar" />
            </span>
        )
    }

    if (icon) {
        return (
            <span style={style} className={className}>
                <FontAwesome name={icon} />
            </span>
        )
    }

    const textNode = textNodeRef.current

    let textStyle
    if (!textReady || !textNode) {
        textStyle = HIDDEN_STYLE
    } else if (textScale === 1) {
        textStyle = NO_STYLE
    } else {
        // 自适应大小
        const textTransformString = `scale(${textScale})`
        textStyle = {
            msTransform: textTransformString,
            WebkitTransform: textTransformString,
            MozTransform: textTransformString,
            transform: textTransformString,
            position: 'absolute',
            display: 'inline-block',
            left: `calc(50% - ${Math.floor(textNode.offsetWidth / 2)}px)`,
        }
    }

    const avatarStyle =
        typeof size === 'number'
            ? {
                  width: `${size}px`,
                  height: `${size}px`,
                  lineHeight: `${size}px`,
                  ...style,
              }
            : style

    const updateTextScale = () => {
        if (children) {
            const scale = fitText(avatarNodeRef.current, textNodeRef.current)

            setTextScale(scale)
            setTextReady(true)
        }
    }

    // ----------------------------------lifecycle--------------------------------------
    useMount(() => {
        updateTextScale()
    })

    useUpdateEffect(() => {
        if (prevChildren !== children) {
            updateTextScale()
        }
    })

    return (
        <span style={avatarStyle} className={className} ref={avatarNodeRef}>
            <span className={avatarClass('inner-string')} style={textStyle} ref={textNodeRef}>
                {children}
            </span>
        </span>
    )
}

Avatar.defaultProps = {
    shape: 'circle',
    size: 'default',
    bordered: false,
}

Avatar.propTypes = {
    shape: PropTypes.oneOf(['circle', 'square']),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'large', 'default', PropTypes.number]), PropTypes.number]),
    icon: PropTypes.string,
    src: PropTypes.string,
    children: PropTypes.string,
    bordered: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
}

export default memo(Avatar)
