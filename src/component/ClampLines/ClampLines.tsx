import { getLocale } from '@/locale'
import { debounce } from '@/utils/func'
import { styles } from '@/utils/style/styles'
import React, { useLayoutEffect, useRef } from 'react'
import useSafeState from '@/hooks/useSafeState'
import useRefMethod from '@/hooks/useRefMethod'
import ReactDOM from 'react-dom'
import Button from '../Button'
import Popover from '../Popover/Popover'
import { ClampLinesProps } from './type'

const ClampLines: React.FC<ClampLinesProps> = function (props) {
    const {
        pop,
        style,
        moreText,
        lessText,
        lines = 3,
        ellipsis = '...',
        showButton = true,
        text: initialText = '',
        className,
    } = props

    const elementRef = useRef<HTMLDivElement>()
    const [collapse, updateCollapse] = useSafeState(true)
    const [clamp, updateClamp] = useSafeState(false)
    const [text, updateText] = useSafeState(initialText.substring(0, 1))
    const [computed, updateComputed] = useSafeState(false)

    const lineHeightRef = useRef(0)

    const clampLines = useRefMethod(
        debounce(() => {
            ReactDOM.unstable_batchedUpdates(() => {
                updateComputed(true)
                updateClamp(true)
            })
        })
    )

    const handleToggle = useRefMethod(() => {
        const nextCollapse = !collapse
        updateCollapse(nextCollapse)

        if (nextCollapse) {
            /** 收起 */
            clampLines()
        } else {
            /** 展开 */
            updateText(initialText)
        }
    })

    useLayoutEffect(() => {
        if (initialText) {
            lineHeightRef.current = elementRef.current.clientHeight
        }

        window.addEventListener('resize', clampLines)

        return () => {
            window.removeEventListener('resize', clampLines)
        }
    }, [])

    useLayoutEffect(() => {
        updateCollapse(true)
        clampLines()
    }, [initialText, lines])

    useLayoutEffect(() => {
        if (!computed) return

        updateComputed(false)

        if (!elementRef.current) return

        const maxHeight = lineHeightRef.current * lines

        let start = 0
        let middle = 0
        let end = initialText.length

        /** 二分查找，找到适合的的分割index */
        while (start <= end) {
            middle = Math.floor((start + end) / 2)

            /** 无需隐藏 */
            if (middle === initialText.length) {
                updateText(initialText)
                updateClamp(false)

                return
            }

            elementRef.current.innerText = initialText.slice(0, middle)

            if (elementRef.current.clientHeight <= maxHeight) {
                start = middle + 1
            } else {
                end = middle - 1
            }
        }

        const ellipsisContent = !clamp ? '' : ellipsis

        updateText(initialText.slice(0, middle - 5) + ellipsisContent)
    }, [computed])

    if (!initialText) return null

    function renderButton() {
        if (!clamp || !showButton) return

        const buttonText = collapse ? moreText || getLocale('expand') : lessText || getLocale('collapse')

        return (
            <Button onClick={handleToggle} type="link" style={{ padding: 0 }}>
                {buttonText}
            </Button>
        )
    }

    if (pop && collapse) {
        const width = elementRef.current?.getBoundingClientRect()?.width

        return (
            <div className={className} style={styles({ wordBreak: 'break-all' }, style)}>
                <Popover
                    content={initialText}
                    innerProps={{ style: { width, whiteSpace: 'break-spaces' } }}
                    mouseEnterDelay={0.3}
                    animation={false}
                >
                    <div ref={elementRef}>{text}</div>
                </Popover>

                {renderButton()}
            </div>
        )
    }

    return (
        <div className={className} style={styles({ wordBreak: 'break-all' }, style)}>
            <div ref={elementRef}>{text}</div>

            {renderButton()}
        </div>
    )
}

export default React.memo(ClampLines)
