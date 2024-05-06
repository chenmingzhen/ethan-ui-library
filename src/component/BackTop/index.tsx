import React, { useRef, memo, useEffect } from 'react'
import { backTopClass } from '@/styles'
import { FontAwesome } from '@/component/Icon'
import useSafeState from '@/hooks/useSafeState'
import useRefMethod from '@/hooks/useRefMethod'
import Portal from '../Portal'
import { BackTopProps } from './type'

function isBackTopVisible(limitHeight: number) {
    const top = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY

    return top >= limitHeight
}

const BackTop: React.FC<BackTopProps> = (props) => {
    const { height = 100 } = props
    const [visible, setVisible] = useSafeState(isBackTopVisible(height))
    const backTopTimer = useRef<NodeJS.Timeout>()
    const { right, bottom } = props

    const handleClick = useRefMethod((evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.onClick?.(evt)

        if (backTopTimer.current) {
            clearInterval(backTopTimer.current)
        }

        const move = 80

        backTopTimer.current = setInterval(() => {
            const oTop = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY

            if (oTop > 0) {
                document.documentElement.scrollTop = oTop - move
                document.body.scrollTop = document.documentElement.scrollTop
            } else {
                clearInterval(backTopTimer.current)
            }
        }, 10)
    })

    const style = { right: `${right}px`, bottom: `${bottom}px` }

    useEffect(() => {
        const onScroll = () => {
            setVisible(isBackTopVisible(height))
        }

        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)

            if (backTopTimer.current) clearInterval(backTopTimer.current)
        }
    }, [height])

    return (
        <Portal show={visible}>
            <div className={backTopClass('_', visible && 'visible')} onClick={handleClick} style={style}>
                {props.children ? (
                    props.children
                ) : (
                    <div className={backTopClass('content')}>
                        <FontAwesome name="angle-double-up" />
                    </div>
                )}
            </div>
        </Portal>
    )
}

BackTop.displayName = 'EthanBackTop'

export default memo(BackTop)
