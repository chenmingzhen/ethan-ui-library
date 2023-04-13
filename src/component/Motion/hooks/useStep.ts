import { useEffect, useMemo } from 'react'
import useSafeState from '@/hooks/useSafeState'
import { runInNextFrame } from '@/utils/nextFrame'
import useRefMethod from '@/hooks/useRefMethod'
import useMotionEvents from './useMotionEvents'
import { MotionProps, MotionStatus, MotionStep } from '../type'

interface UseStepProps {
    status: MotionStatus
    getElement(): HTMLElement
    onDestroy?: () => void
    onEnterStart: MotionProps['onEnterStart']
    onEnterActive: MotionProps['onEnterActive']
    onEnterEnd: MotionProps['onEnterEnd']
    onLeaveStart: MotionProps['onLeaveStart']
    onLeaveActive: MotionProps['onLeaveActive']
    onLeaveEnd: MotionProps['onLeaveEnd']
}

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
        onEnterStart,
        onEnterActive,
        onLeaveStart,
        onLeaveActive,
        getElement,
        onEnterEnd,
        onLeaveEnd,
        onDestroy,
    } = props

    const onMotionEnd = useRefMethod((evt: TransitionEvent | AnimationEvent) => {
        const element = getElement()

        if (evt.target !== element) return

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

    useEffect(() => {
        if (step === MotionStep.NONE) return

        const index = STEP_QUEUE.indexOf(step)
        const triggerEvent = triggerEvents[step]

        if (triggerEvent) {
            triggerEvent(getElement())
        }

        const nextStep = STEP_QUEUE[index + 1]

        if (nextStep === MotionStep.ACTIVE) {
            addMotionEventListener()
        }

        runInNextFrame(() => {
            if (step !== MotionStep.ACTIVE) {
                /** active状态由MotionEnd驱动下一步骤 */
                setStep(nextStep)
            }
        })
    }, [step])

    function startStep() {
        setStep(MotionStep.PREPARE)
    }

    return [step, startStep]
}
