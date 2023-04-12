import useSafeState from '@/hooks/useSafeState'
import { useEffect, useMemo, useRef } from 'react'
import useRefMethod from '@/hooks/useRefMethod'
import delay from '@/utils/func'
import { MotionProps, MotionStatus, MotionStep } from '../type'
import useStepQueue from './useStepQueue'
import useMotionEvents from './useMotionEvents'

interface UseStatusProps {
    getElement: () => HTMLElement
    destroyOnLeave: MotionProps['destroyOnLeave']
    visible: MotionProps['visible']
    enter: MotionProps['enter']
    leave: MotionProps['leave']
    enterDelay: MotionProps['enterDelay']
    onEnterStart: MotionProps['onEnterStart']
    onEnterActive: MotionProps['onEnterActive']
    onEnterEnd: MotionProps['onEnterEnd']
    leaveDelay: MotionProps['leaveDelay']
    onLeaveStart: MotionProps['onLeaveStart']
    onLeaveActive: MotionProps['onLeaveActive']
    onLeaveEnd: MotionProps['onLeaveEnd']
}

export default function useStatus(props: UseStatusProps): [MotionStatus, MotionStep] {
    const {
        visible,
        getElement,
        destroyOnLeave,
        enterDelay,
        enter = true,
        leave = true,
        onEnterStart,
        onEnterActive,
        onEnterEnd,
        leaveDelay,
        onLeaveStart,
        onLeaveActive,
        onLeaveEnd,
    } = props
    const [status, updateStatus] = useSafeState(MotionStatus.NONE)

    const handleMotionEnd = useRefMethod((evt: TransitionEvent | AnimationEvent) => {
        const element = getElement()

        if (evt.target !== element) return

        if (status === MotionStatus.ENTER) {
            onEnterEnd?.(element)
        } else if (status === MotionStatus.LEAVE) {
            onLeaveEnd?.(element)
        }

        if (status === MotionStatus.LEAVE && destroyOnLeave) {
            updateStatus(MotionStatus.NONE)
        }

        endStep()
    })

    const [addMotionEventListener] = useMotionEvents(getElement, handleMotionEnd)

    const [step, startStep, endStep] = useStepQueue(status, async (newStep) => {
        const triggerEvent = triggerEvents[step]

        if (triggerEvent) {
            triggerEvent(getElement())
        }

        if (newStep === MotionStep.PREPARE) {
            if (status === MotionStatus.ENTER && enterDelay >= 0) {
                await delay(enterDelay)
            } else if (status === MotionStatus.LEAVE && leaveDelay >= 0) {
                await delay(enterDelay)
            }
        }

        if (newStep === MotionStep.ACTIVE) {
            addMotionEventListener()
        }
    })

    const triggerEvents = useMemo(() => {
        if (status === MotionStatus.ENTER) {
            return {
                [MotionStep.START]: onEnterStart,
                [MotionStep.ACTIVE]: onEnterActive,
            }
        }
        if (status === MotionStatus.LEAVE) {
            return {
                [MotionStep.START]: onLeaveStart,
                [MotionStep.ACTIVE]: onLeaveActive,
            }
        }

        return {}
    }, [status])

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
