import useSafeState from '@/hooks/useSafeState'
import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import useRefMethod from '@/hooks/useRefMethod'
import { runInNextFrame } from '@/utils/nextFrame'
import { MotionProps, MotionStatus, MotionStep } from '../type'

interface UseMotionTrackerProps {
    noAnimationButStep: MotionProps['noAnimationButStep']
    getElement: () => HTMLElement
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

type MotionEvent = TransitionEvent | AnimationEvent

const STEP_QUEUE: MotionStep[] = [
    MotionStep.PREPARE,
    MotionStep.START,
    MotionStep.ACTIVE,
    MotionStep.END,
    MotionStep.NONE,
]

function useMotionTracker(props: UseMotionTrackerProps): [MotionStatus, MotionStep] {
    const {
        visible,
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
        noAnimationButStep,
    } = props
    const [status, updateStatus] = useSafeState(MotionStatus.NONE)
    const [step, updateStep] = useSafeState<MotionStep>(MotionStep.NONE)

    /** 切换步骤的任务 */
    const nextStepRaf = useRef<() => void>()

    /** 当第一次visible值为false时不需要执行动画 */
    const isNotTriggerMotionRef = useRef(true)

    const onMotionEnd = useRefMethod((evt: MotionEvent) => {
        const motionElement = getElement()

        /** 忽视非MotionElement触发的MotionEnd */
        if (evt.target !== motionElement) return

        /** 有其他阶段正在进行，此次MotionEnd不生效  */
        if (nextStepRaf.current) return

        motionElement?.removeEventListener('transitionend', onMotionEnd)
        motionElement?.removeEventListener('animationend', onMotionEnd)

        updateStep(MotionStep.END)
    })

    const triggerEvent = useRefMethod((triggerStatus: MotionStatus, triggerStep: MotionStep) => {
        const motionElement = getElement()

        if (triggerStatus === MotionStatus.ENTER) {
            if (triggerStep === MotionStep.PREPARE && onEnterPrepare) {
                onEnterPrepare(motionElement)
            }
            if (triggerStep === MotionStep.START && onEnterStart) {
                onEnterStart(motionElement)
            }
            if (triggerStep === MotionStep.ACTIVE && onEnterActive) {
                onEnterActive(motionElement)
            }
            if (triggerStep === MotionStep.END && onEnterEnd) {
                onEnterEnd(motionElement)
            }
        }
        if (triggerStatus === MotionStatus.LEAVE) {
            if (triggerStep === MotionStep.PREPARE && onLeavePrepare) {
                onLeavePrepare(motionElement)
            }
            if (triggerStep === MotionStep.START && onLeaveStart) {
                onLeaveStart(motionElement)
            }
            if (triggerStep === MotionStep.ACTIVE && onLeaveActive) {
                onLeaveActive(motionElement)
            }
            if (triggerStep === MotionStep.END && onLeaveEnd) {
                onLeaveEnd(motionElement)
            }
        }
    })

    const startMotion = useRefMethod((startStatus: MotionStatus) => {
        if (nextStepRaf.current) {
            /** 清除上个阶段 */
            updateStep(MotionStep.NONE)

            nextStepRaf.current()

            nextStepRaf.current = runInNextFrame(() => {
                updateStatus(startStatus)
                updateStep(MotionStep.PREPARE)
            })
        } else {
            updateStatus(startStatus)
            updateStep(MotionStep.PREPARE)
        }
    })

    useIsomorphicLayoutEffect(() => {
        if (isNotTriggerMotionRef.current && !visible) {
            return
        }

        isNotTriggerMotionRef.current = false

        let nextStatus: MotionStatus = visible ? MotionStatus.IGNORE_ENTER : MotionStatus.IGNORE_LEAVE

        if (visible && (enter || noAnimationButStep)) {
            nextStatus = MotionStatus.ENTER
        }

        if (!visible && (leave || noAnimationButStep)) {
            nextStatus = MotionStatus.LEAVE
        }

        if (nextStatus) {
            startMotion(nextStatus)
        }
    }, [visible])

    useIsomorphicLayoutEffect(() => {
        if (step === MotionStep.NONE) return

        /** 触发对应的事件 */
        triggerEvent(status, step)

        const index = STEP_QUEUE.indexOf(step)
        const nextStep = STEP_QUEUE[index + 1]

        if (destroyAfterLeave && status === MotionStatus.LEAVE && step === MotionStep.END) {
            /** 销毁DOM */
            updateStatus(MotionStatus.NONE)
        }

        if (nextStep) {
            nextStepRaf.current = runInNextFrame(() => {
                /** active状态由MotionEnd驱动下一步骤 */
                if (step !== MotionStep.ACTIVE) {
                    updateStep(nextStep)
                }

                nextStepRaf.current = null
            })
        }

        if (nextStep === MotionStep.ACTIVE) {
            if (noAnimationButStep) {
                if (nextStepRaf.current) {
                    nextStepRaf.current()
                }

                nextStepRaf.current = runInNextFrame(() => {
                    const mockMotionEvent = { target: getElement() } as unknown as MotionEvent
                    onMotionEnd(mockMotionEvent)
                })
            } else {
                getElement()?.addEventListener('transitionend', onMotionEnd)
                getElement()?.addEventListener('animationend', onMotionEnd)
            }
        }
    }, [step])

    return [status, step]
}

export default useMotionTracker
