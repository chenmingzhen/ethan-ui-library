import React, { useMemo } from 'react'
import { capitalize } from '@/utils/strings'
import { alertClass } from '@/styles'
import { AlertType } from '../alert'
import icons from '../../icons'

interface UseRenderParams {
    closeItem?: React.ReactNode

    icon?: boolean | Element

    type?: AlertType

    iconSize?: number

    handleClose(): void
}

const useRender = ({ handleClose, closeItem, icon, type, iconSize }: UseRenderParams) => {
    const renderIcon = useMemo(() => {
        if (typeof icon === 'boolean' && icon) {
            icon = icons[capitalize(type)]
        }

        if (!icon) return null

        const style = {
            width: iconSize,
            height: iconSize,
            marginRight: iconSize / 2,
        }

        return (
            <div className={alertClass('icon')} style={style}>
                {icon}
            </div>
        )
    }, [icon, type, iconSize])

    const renderClose = useMemo(() => {
        if (React.isValidElement(closeItem)) return React.cloneElement(closeItem, { onClick: handleClose })
        return (
            <a className={alertClass('close')} onClick={handleClose}>
                {closeItem || icons.Close}
            </a>
        )
    }, [closeItem, handleClose])

    return { renderIcon, renderClose }
}

export default useRender
