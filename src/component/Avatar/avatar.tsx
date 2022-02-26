import React, { memo, useState, useRef, useEffect } from 'react'
import { FontAwesome } from '@/component/Icon'
import { avatarClass } from '@/styles'
import fitText from '@/component/Avatar/util'

export interface AvatarProps {
    shape?: 'circle' | 'square'
    size?: 'small' | 'large' | 'default' | number
    icon?: string
    src?: string
    children?: string
    bordered?: boolean
    style?: React.CSSProperties
    className?: string
}

const Avatar: React.FC<AvatarProps> = props => {
    const [textScale, setTextScale] = useState(1)
    const [textReady, setTextReady] = useState(false)

    const textNodeRef = useRef<HTMLSpanElement>()
    const avatarNodeRef = useRef<HTMLSpanElement>()

    const { size, shape, src, icon, children, bordered, style } = props
    const useImage = !!src
    const useString = !!children

    const className = avatarClass('_', props.className, shape, typeof size === 'string' ? size : '', {
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

    let textStyle: React.CSSProperties

    if (!textReady || !textNode) {
        textStyle = {
            opacity: 0,
        }
    } else if (textScale === 1) {
        textStyle = {}
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

    useEffect(() => {
        if (children) {
            const scale = fitText(avatarNodeRef.current, textNodeRef.current)
            setTextScale(scale)
            setTextReady(true)
        }
    }, [children])

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

Avatar.displayName = 'EthanAvatar'

export default memo(Avatar)
