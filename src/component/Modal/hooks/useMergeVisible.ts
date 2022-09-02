import { useRef, useState } from 'react'
import { useUpdateEffect } from 'react-use'

const ANIMATION_TIME = 3 * 1000

const useMergeVisible = (propVisible: boolean) => {
    const [visible, updateVisible] = useState(propVisible)

    const animationRaf = useRef<NodeJS.Timeout>()

    useUpdateEffect(() => {
        if (animationRaf.current) {
            clearTimeout(animationRaf.current)

            animationRaf.current = null
        }

        if (propVisible) {
            updateVisible(propVisible)
        } else {
            animationRaf.current = setTimeout(() => {
                updateVisible(propVisible)
            }, ANIMATION_TIME)
        }
    }, [propVisible])

    return [visible, updateVisible]
}

export default useMergeVisible
