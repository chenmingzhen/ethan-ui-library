import useRefMethod from '@/hooks/useRefMethod'
import useSafeState from '@/hooks/useSafeState'
import { useEffect } from 'react'

/** 输入模式下，当筛选面板的出现或隐藏，需要将一次OptionList的动画 */
export function useLockAnimation(): [boolean, () => void] {
    const [lockAnimation, setLockAnimation] = useSafeState(false)

    const startLockAnimation = useRefMethod(() => {
        setLockAnimation(true)
    })

    useEffect(() => {
        if (lockAnimation) {
            setLockAnimation(false)
        }
    }, [lockAnimation])

    return [lockAnimation, startLockAnimation]
}
