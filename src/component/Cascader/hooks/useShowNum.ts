import useRefMethod from '@/hooks/useRefMethod'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useUpdate } from 'react-use'
import { runInNextFrame } from '@/utils/nextFrame'
import { addResizeObserver } from '@/utils/dom/element'
import { debounce } from '@/utils/func'
import { cascaderClass } from '@/styles'
import { CascaderProps } from '../type'
import { getResetMore } from '../util'

interface UseShowNumProps {
    value: CascaderProps['value']
    compressed: CascaderProps['compressed']
    resultElementRef: RefObject<HTMLDivElement>
}

export default function useShowNum(props: UseShowNumProps) {
    const { value, compressed, resultElementRef } = props
    const [showNum, setShowNum] = useState(-1)
    const update = useUpdate()
    const shouldResetMoreRef = useRef(false)
    const resetMore = useRefMethod(() => {
        /** 由于不确定执行update之后，是否会马上执行render，再而执行effect，使得shouldResetMoreRef.current = true的操作会在最后执行,导致无法计算。 */
        shouldResetMoreRef.current = true
        setShowNum(-1)
        update()

        /** 下面代码碰到了以下(非常见)流程 update => render => effect => shouldResetMoreRef.current = true */
        /** 常见流程 update => shouldResetMoreRef.current = true => render => effect */
        // setShowNum(-1)
        // update()
        // shouldResetMoreRef.current = true
    })

    useEffect(() => {
        if (!compressed) return

        return addResizeObserver(resultElementRef.current, debounce(resetMore), { direction: 'x' })
    }, [compressed])

    useEffect(() => {
        if (!compressed) return

        if (!shouldResetMoreRef.current) {
            resetMore()
        }
    }, [value])

    useEffect(() => {
        if (!compressed) return

        if (shouldResetMoreRef.current) {
            runInNextFrame(() => {
                setShowNum(
                    getResetMore({
                        fixWidth: 0,
                        container: resultElementRef.current,
                        doms: resultElementRef.current.querySelectorAll(`.${cascaderClass('item')}`),
                    })
                )
            })
            shouldResetMoreRef.current = false
        }
    }, [shouldResetMoreRef.current])

    return [showNum]
}
