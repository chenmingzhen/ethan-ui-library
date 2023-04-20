import useSafeState from '@/hooks/useSafeState'
import { useEffect, useRef } from 'react'
import { MotionProps, MotionStatus, MotionStep } from '../type'
import useStep from './useStep'

interface UseStatusProps {
    getElement: () => HTMLElement
    forceStep: MotionProps['forceStep']
    destroyAfterLeave: MotionProps['destroyAfterLeave']
    visible: MotionProps['visible']
    enter: MotionProps['enter']
    leave: MotionProps['leave']
    onEnterPrepare: MotionProps['onEnterPrepare']
    onEnterStart: MotionProps['onEnterStart']
    onEnterActive: MotionProps['onEnterActive']
    onEnterEnd: MotionProps['onEnterEnd']
    onLeavePrepare: MotionProps['onEnterPrepare']
    onLeaveStart: MotionProps['onLeaveStart']
    onLeaveActive: MotionProps['onLeaveActive']
    onLeaveEnd: MotionProps['onLeaveEnd']
}

export default function useStatus(props: UseStatusProps): [MotionStatus, MotionStep] {
    const {
        visible,
        forceStep,
        getElement,
        destroyAfterLeave,
        enter = true,
        leave = true,
        onEnterPrepare,
        onEnterStart,
        onEnterActive,
        onEnterEnd,
        onLeavePrepare,
        onLeaveStart,
        onLeaveActive,
        onLeaveEnd,
    } = props
    const [status, updateStatus] = useSafeState(MotionStatus.NONE)

    const [step, startStep] = useStep({
        status,
        forceStep,
        getElement,
        onEnterPrepare,
        onEnterStart,
        onEnterActive,
        onLeavePrepare,
        onLeaveStart,
        onLeaveActive,
        onEnterEnd,
        onLeaveEnd,
        onDestroy: destroyAfterLeave ? () => updateStatus(MotionStatus.NONE) : undefined,
    })

    /** 当第一次visible值为false时不需要执行动画 */
    const isNotTriggerMotionRef = useRef(true)

    useEffect(() => {
        if (isNotTriggerMotionRef.current && !visible) {
            return
        }

        isNotTriggerMotionRef.current = false

        let nextStatus: MotionStatus = visible ? MotionStatus.IGNORE_ENTER : MotionStatus.IGNORE_LEAVE

        if (visible && (enter || forceStep)) {
            nextStatus = MotionStatus.ENTER
        }

        if (!visible && (leave || forceStep)) {
            nextStatus = MotionStatus.LEAVE
        }

        if (nextStatus) {
            updateStatus(nextStatus)
            startStep()
        }
    }, [visible])

    return [status, step]
}
