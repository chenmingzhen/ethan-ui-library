import React, { isValidElement, useEffect } from 'react'
import classnames from 'classnames'
import { wrapSpan } from '@/utils/dom/element'
import { buttonClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import Spin from '../Spin'
import { ButtonProps } from './type'

const Button: React.FC<ButtonProps> = (props) => {
    const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>()

    const {
        text,
        size,
        href,
        shape,
        target,
        loading,
        onClick,
        outline,
        disabled,
        children,
        autoFocus,
        type = 'default',
        htmlType = 'button',
        ...others
    } = props

    const innerChildren = React.useMemo(() => {
        if (!children) return children

        return React.Children.map(wrapSpan(children), (item) => {
            if (loading && isValidElement(item) && (item?.type as any)?.isEthanIcon) return null

            return item
        }).filter(Boolean)
    }, [children, loading])

    const handleClick = useRefMethod((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        buttonRef.current.blur()

        onClick?.(e)
    })

    useEffect(() => {
        if (autoFocus) {
            buttonRef.current.focus()
        }
    }, [])

    const color = outline || type === 'default' ? undefined : '#fff'

    const className = classnames(
        buttonClass('_', shape, type, outline && 'outline', text && 'text', {
            large: size === 'large',
            small: size === 'small',
            disabled,
        }),
        props.className
    )

    if (href) {
        return (
            <a
                href={href}
                {...others}
                ref={buttonRef as React.MutableRefObject<HTMLAnchorElement>}
                className={className}
            >
                {innerChildren}
            </a>
        )
    }

    return (
        <button
            {...others}
            ref={buttonRef as React.MutableRefObject<HTMLButtonElement>}
            disabled={disabled || loading}
            type={htmlType}
            className={className}
            onClick={handleClick}
        >
            {loading && (
                <span className={buttonClass('spin')}>
                    <Spin size={12} name="ring" color={color} />
                </span>
            )}
            {innerChildren}
        </button>
    )
}

Button.displayName = 'EthanButton'

export default React.memo(Button)
