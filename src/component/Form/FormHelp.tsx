import React from 'react'
import { PureComponent } from '@/utils/component'
import { formClass } from '@/styles'
import AnimationList, { FAST_TRANSITION_DURATION } from '../List'
import { FormHelpProps } from './type'

interface FormHelpState {
    cacheError: Error
}

export default class FormHelp extends PureComponent<FormHelpProps, FormHelpState> {
    clearErrorTimer: NodeJS.Timeout

    constructor(props: FormHelpProps) {
        super(props)

        this.state = {
            cacheError: undefined,
        }
    }

    componentDidMount(): void {
        const { error } = this.props

        if (error) {
            this.setState({ cacheError: error })
        }
    }

    componentDidUpdate(_, prevState: Readonly<FormHelpState>): void {
        if (!this.props.animation) return

        if (this.props.error) {
            this.setState({ cacheError: this.props.error })
        } else if (prevState.cacheError) {
            if (this.clearErrorTimer) {
                clearTimeout(this.clearErrorTimer)

                this.clearErrorTimer = null
            }

            this.clearErrorTimer = setTimeout(() => {
                this.setState({ cacheError: undefined })
            }, FAST_TRANSITION_DURATION)
        }
    }

    render() {
        const { cacheError } = this.state

        const { error, animation, tip } = this.props

        if (cacheError || error) {
            return (
                <AnimationList
                    duration="fast"
                    className={formClass('error')}
                    animationTypes={animation ? ['fade'] : undefined}
                    show={!!error}
                >
                    {error ? error.message : cacheError.message}
                </AnimationList>
            )
        }

        if (tip) {
            return <div className={formClass('tip')}>{tip}</div>
        }

        return null
    }
}
