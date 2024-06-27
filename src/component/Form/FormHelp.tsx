import React, { useState, useEffect, useRef } from 'react'
import { formClass } from '@/styles'
import Motion from '../Motion'
import { FormHelpProps } from './type'
import { FAST_TRANSITION_DURATION } from '../Motion/Transition'

const FormHelp: React.FC<FormHelpProps> = ({ error, animation, tip }) => {
    const [cacheError, setCacheError] = useState<Error | undefined>(error)
    const clearErrorTimerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (error) {
            setCacheError(error)
        }
    }, [error])

    useEffect(() => {
        if (!animation) return

        if (!error && cacheError) {
            if (clearErrorTimerRef.current) {
                clearTimeout(clearErrorTimerRef.current)
                clearErrorTimerRef.current = null
            }

            clearErrorTimerRef.current = setTimeout(() => {
                setCacheError(undefined)
            }, FAST_TRANSITION_DURATION)
        }
    }, [error, cacheError])

    useEffect(
        () => () => {
            if (clearErrorTimerRef.current) {
                clearTimeout(clearErrorTimerRef.current)
            }
        },
        []
    )

    if (cacheError || error) {
        return (
            <Motion.Transition
                duration="fast"
                className={formClass('error')}
                transitionTypes={animation ? ['fade'] : undefined}
                visible={!!error}
            >
                {error ? error.message : cacheError.message}
            </Motion.Transition>
        )
    }

    if (tip) {
        return <div className={formClass('tip')}>{tip}</div>
    }

    return null
}

export default FormHelp
