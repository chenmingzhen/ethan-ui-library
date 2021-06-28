import React, { isValidElement } from 'react'
import classnames from 'classnames'
import { wrapSpan } from '@/utils/dom/element'
import { buttonClass } from '@/styles'
import Spin from '../Spin'

export interface ButtonProps {
    children: React.ReactNode

    className?: string

    /*  */
    disabled?: boolean

    /*  */
    href?: string

    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void

    outline?: boolean

    size?: 'large' | 'default' | 'small'

    space?: string

    style?: React.CSSProperties

    text?: boolean

    type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link'

    loading?: boolean

    htmlType?: 'button' | 'submit' | 'reset'

    shape?: 'round' | 'circle'
}

const Button: React.FC<ButtonProps> = props => {
    const buttonRef = React.useRef<HTMLButtonElement>()

    const {
        outline: outlineProp = false,
        type: typeProp = 'default',
        size,
        href,
        htmlType = 'button',
        loading,
        disabled,
        shape,
        text,
        children,
        onClick,
        ...others
    } = props

    const Children = React.useMemo(() => {
        if (!children) return children

        return React.Children.map(wrapSpan(children), item => {
            // 对 loading情况做处理 如果是loading 去除Icon
            if (loading && isValidElement(item) && item?.type?.isEthanIcon) return null

            return item
        }).filter(v => v !== null)
    }, [children, loading])

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        buttonRef.current?.blur()

        onClick?.(e)
    }

    // 区分 type为secondary的类型  secondary底色为透明
    const isSecondary = typeProp === 'secondary' && !outlineProp && !text
    const type = isSecondary ? 'primary' : typeProp
    const outline = outlineProp || isSecondary
    const color = outline || type === 'default' ? undefined : '#fff'
    const className = classnames(
        buttonClass('_', shape, type, outline && 'outline', {
            large: size === 'large',
            small: size === 'small',
            text: text && 'text',
            disabled,
        }),
        props.className
    )

    // 链接按钮
    if (href) {
        return (
            <a href={href} {...others} className={className}>
                {children}
            </a>
        )
    }

    return (
        <button
            ref={buttonRef}
            disabled={disabled || loading}
            type={htmlType}
            className={className}
            {...others}
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
