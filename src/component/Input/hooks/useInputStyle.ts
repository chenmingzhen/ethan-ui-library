import FormItemContext from '@/component/Form/context/formItemContext'
import { PopoverProps } from '@/component/Popover/type'
import { inputClass } from '@/styles'
import { styles } from '@/utils/style/styles'
import classnames from 'classnames'
import { useContext } from 'react'

interface UseInputStyleProps {
    border: boolean
    size: 'small' | 'default' | 'large'
    disabled?: boolean
    className?: string
    width?: React.CSSProperties['width']
    style?: React.CSSProperties
    popoverProps?: Omit<PopoverProps, 'children'>
    focus?: boolean
    hasError?: boolean
}

function useInputStyle(props: UseInputStyleProps) {
    const { border = true, size, disabled, focus, className, width, style, popoverProps, hasError } = props
    const { hasItemError } = useContext(FormItemContext) || {}
    const ms = styles({ width }, style)
    const cls = classnames(
        inputClass(
            '_',
            ((focus && disabled !== true) || (popoverProps?.placement && hasError)) && 'focus',
            disabled === true && 'disabled',
            size,
            ms.width && 'inline-flex',
            !border && 'no-border',
            (hasItemError || hasError) && 'invalid'
        ),
        className
    )

    return { className: cls, style: ms }
}

export default useInputStyle
