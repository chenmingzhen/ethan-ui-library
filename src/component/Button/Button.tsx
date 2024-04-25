import React, { isValidElement, useEffect } from 'react'
import classnames from 'classnames'
import { wrapSpan } from '@/utils/dom/element'
import { buttonClass } from '@/styles'
import Spin from '../Spin'
import { ButtonProps } from './type'

const Button: React.FC<ButtonProps> = (props) => {
    const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>()

    const {
        outline,
        type = 'primary',
        size,
        href,
        htmlType = 'button',
        loading,
        disabled,
        shape,
        text,
        children,
        onClick,
        target,
        autoFocus,
        ...others
    } = props

    const Children = React.useMemo(() => {
        if (!children) return children

        return React.Children.map(wrapSpan(children), (item) => {
            // 对 loading情况做处理 如果是loading 去除Icon
            if (loading && isValidElement(item) && (item?.type as any)?.isEthanIcon) return null

            return item
        }).filter((v) => v !== null)
    }, [children, loading])

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        buttonRef.current?.blur()

        onClick?.(e)
    }

    const color = outline || type === 'default' ? undefined : '#fff'

    const className = classnames(
        buttonClass('_', shape, type, outline && 'outline', text && 'text', {
            large: size === 'large',
            small: size === 'small',
            disabled,
        }),
        props.className
    )

    useEffect(() => {
        if (autoFocus) {
            buttonRef.current.focus()
        }
    }, [])

    if (href) {
        return (
            <a
                href={href}
                {...others}
                ref={buttonRef as React.MutableRefObject<HTMLAnchorElement>}
                className={className}
            >
                {Children}
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
            {Children}
        </button>
    )
}

Button.displayName = 'EthanButton'

export default React.memo(Button)
