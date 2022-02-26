import React, { useRef, memo, useEffect } from 'react'
import { backTopClass } from '@/styles'
import { FontAwesome } from '@/component/Icon'
import useSafeState from '@/hooks/useSafeState'
import ReactDOM from 'react-dom'

export interface BackTopProps {
    right?: number

    bottom?: number

    height?: number

    children?: React.ReactNode

    onClick?(e?: React.MouseEvent<HTMLElement, MouseEvent>): void
}

function isBackTopVisible(limitHeight) {
    const top = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY

    return top >= limitHeight
}

const BackTop: React.FC<BackTopProps> = props => {
    const [visible, setVisible] = useSafeState(isBackTopVisible(props.height))
    const backTopTimer = useRef<NodeJS.Timeout>()
    const container = useRef<HTMLDivElement>(document.createElement('div')).current
    const { right, bottom } = props

    const onClick = e => {
        props.onClick?.(e)

        if (backTopTimer.current) {
            clearInterval(backTopTimer.current)
        }

        const height = 80

        backTopTimer.current = setInterval(() => {
            const oTop = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY

            if (oTop > 0) {
                document.documentElement.scrollTop = oTop - height
                document.body.scrollTop = document.documentElement.scrollTop
            } else {
                clearInterval(backTopTimer.current)
            }
        }, 10)
    }

    const style = { right: `${right}px`, bottom: `${bottom}px` }

    useEffect(() => {
        const onScroll = () => {
            setVisible(isBackTopVisible(props.height))
        }

        document.body.appendChild(container)

        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)

            if (backTopTimer.current) clearInterval(backTopTimer.current)
        }
    }, [props.height])

    return ReactDOM.createPortal(
        <div className={backTopClass('_', visible && 'visible')} onClick={onClick} style={style}>
            {props.children ? (
                props.children
            ) : (
                <div className={backTopClass('content')}>
                    <FontAwesome name="angle-double-up" />
                </div>
            )}
        </div>,
        container
    )
}

BackTop.defaultProps = {
    height: 100,
}

BackTop.displayName = 'EthanBackTop'

export default memo(BackTop)
