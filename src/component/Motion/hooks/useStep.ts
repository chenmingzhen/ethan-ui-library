import { useEffect, useMemo, useRef } from 'react'
import useSafeState from '@/hooks/useSafeState'
import { runInNextFrame } from '@/utils/nextFrame'
import useRefMethod from '@/hooks/useRefMethod'
import useMotionEvents from './useMotionEvents'
import { MotionProps, MotionStatus, MotionStep } from '../type'

interface UseStepProps {
    status: MotionStatus
    forceStep: MotionProps['forceStep']
    getElement(): HTMLElement
    onDestroy?: () => void
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

export default function useStep(props: UseStepProps): [MotionStep, () => void] {
    const [step, setStep] = useSafeState<MotionStep>(MotionStep.NONE)
    const {
        status,
        forceStep,
        onEnterPrepare,
        onEnterStart,
        onEnterActive,
        onLeavePrepare,
        onLeaveStart,
        onLeaveActive,
        getElement,
        onEnterEnd,
        onLeaveEnd,
        onDestroy,
    } = props

    const cancelRafRef = useRef<() => void>()

    const onMotionEnd = useRefMethod((evt: MotionEvent) => {
        const element = getElement()

        if (evt.target !== element || cancelRafRef.current) return

        if (status === MotionStatus.ENTER) {
            onEnterEnd?.(element)
        } else if (status === MotionStatus.LEAVE) {
            onLeaveEnd?.(element)
        }

        if (status === MotionStatus.LEAVE && onDestroy) {
            onDestroy()
        }

        setStep(MotionStep.END)
    })

    const [addMotionEventListener] = useMotionEvents(getElement, onMotionEnd)

    const triggerEvents = useMemo(() => {
        if (status === MotionStatus.ENTER) {
            return {
                [MotionStep.PREPARE]: onEnterPrepare,
                [MotionStep.START]: onEnterStart,
                [MotionStep.ACTIVE]: onEnterActive,
            }
        }
        if (status === MotionStatus.LEAVE) {
            return {
                [MotionStep.PREPARE]: onLeavePrepare,
                [MotionStep.START]: onLeaveStart,
                [MotionStep.ACTIVE]: onLeaveActive,
            }
        }

        return {}
    }, [status])

    useEffect(() => {
        if (step === MotionStep.NONE) return

        /** 中止上个Status残留的动画 */
        if (cancelRafRef.current) {
            cancelRafRef.current()
            cancelRafRef.current = undefined
        }

        const index = STEP_QUEUE.indexOf(step)
        const triggerEvent = triggerEvents[step]

        if (triggerEvent) {
            triggerEvent(getElement())
        }

        const nextStep = STEP_QUEUE[index + 1]

        if (nextStep === MotionStep.ACTIVE) {
            addMotionEventListener()
        }

        cancelRafRef.current = runInNextFrame(() => {
            /** forceStep没有enter或leave，需要手动模拟触发onMotionEnd */
            if (step === MotionStep.ACTIVE && forceStep) {
                /** 延迟触发，待cancelRafRef清空后再执行 */
                setTimeout(() => {
                    const mockMotionEvent = { target: getElement() } as unknown as MotionEvent

                    onMotionEnd(mockMotionEvent)
                })
            } else if (step !== MotionStep.ACTIVE) {
                /** active状态由MotionEnd驱动下一步骤 */
                setStep(nextStep)
            }

            cancelRafRef.current = undefined
        })
    }, [step])

    function startStep() {
        setStep(MotionStep.PREPARE)
    }

    return [step, startStep]
}
