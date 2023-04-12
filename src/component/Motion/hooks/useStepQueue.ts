import useSafeState from '@/hooks/useSafeState'
import { useEffect, useRef } from 'react'
import { runInNextFrame } from '@/utils/nextFrame'
import { MotionStatus, MotionStep } from '../type'

const STEP_QUEUE: MotionStep[] = [
    MotionStep.PREPARE,
    MotionStep.START,
    MotionStep.ACTIVE,
    MotionStep.END,
    MotionStep.NONE,
]

export default (
    status: MotionStatus,
    onStepChange: (step: MotionStep) => Promise<void>
): [MotionStep, () => void, () => void] => {
    const [step, setStep] = useSafeState<MotionStep>(MotionStep.NONE)
    const cancelRafRef = useRef<() => void>()

    function startStep() {
        setStep(MotionStep.PREPARE)
    }

    function endStep() {
        setStep(MotionStep.END)
    }

    useEffect(() => {
        if (step === MotionStep.NONE) return

        const index = STEP_QUEUE.indexOf(step)

        Promise.resolve(onStepChange(step)).then(() => {
            cancelRafRef.current = runInNextFrame(() => {
                if (cancelRafRef.current) {
                    cancelRafRef.current()
                }

                if (step !== MotionStep.ACTIVE) {
                    /** active状态由MotionEnd驱动下一步骤 */
                    setStep(STEP_QUEUE[index + 1])
                }
            })
        })
    }, [status, step])

    useEffect(() => cancelRafRef.current, [])

    return [step, startStep, endStep]
}
