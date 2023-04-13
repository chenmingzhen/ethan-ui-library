import useSafeState from '@/hooks/useSafeState'
import { useEffect, useRef } from 'react'
import { MotionProps, MotionStatus, MotionStep } from '../type'
import useStep from './useStep'

interface UseStatusProps {
    getElement: () => HTMLElement
    destroyOnLeave: MotionProps['destroyOnLeave']
    visible: MotionProps['visible']
    enter: MotionProps['enter']
    leave: MotionProps['leave']
    onEnterStart: MotionProps['onEnterStart']
    onEnterActive: MotionProps['onEnterActive']
    onEnterEnd: MotionProps['onEnterEnd']
    onLeaveStart: MotionProps['onLeaveStart']
    onLeaveActive: MotionProps['onLeaveActive']
    onLeaveEnd: MotionProps['onLeaveEnd']
}

export default function useStatus(props: UseStatusProps): [MotionStatus, MotionStep] {
    const {
        visible,
        getElement,
        destroyOnLeave,
        enter = true,
        leave = true,
        onEnterStart,
        onEnterActive,
        onEnterEnd,
        onLeaveStart,
        onLeaveActive,
        onLeaveEnd,
    } = props
    const [status, updateStatus] = useSafeState(MotionStatus.NONE)

    const [step, startStep] = useStep({
        status,
        getElement,
        onEnterStart,
        onEnterActive,
        onLeaveStart,
        onLeaveActive,
        onEnterEnd,
        onLeaveEnd,
        onDestroy: destroyOnLeave ? () => updateStatus(MotionStatus.NONE) : undefined,
    })

    /** 当第一次visible值为false时不需要执行动画 */
    const isNotTriggerMotionRef = useRef(true)

    useEffect(() => {
        if (isNotTriggerMotionRef.current && !visible) {
            return
        }

        isNotTriggerMotionRef.current = false

        let nextStatus: MotionStatus = visible ? MotionStatus.IGNORE_ENTER : MotionStatus.IGNORE_LEAVE

        if (visible && enter) {
            nextStatus = MotionStatus.ENTER
        }

        if (!visible && leave) {
            nextStatus = MotionStatus.LEAVE
        }

        if (nextStatus) {
            updateStatus(nextStatus)
            startStep()
        }
    }, [visible])

    return [status, step]
}
