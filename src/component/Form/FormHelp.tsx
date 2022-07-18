import React from 'react'
import { PureComponent } from '@/utils/component'
import { formClass } from '@/styles'
import AnimationList, { FAST_TRANSITION_DURATION } from '../List'

interface FormHelpProps {
    error?: Error

    tip?: React.ReactNode
}

interface FormHelpState {
    cacheError: Error

    cacheTip: React.ReactNode
}

export default class FormHelp extends PureComponent<FormHelpProps, FormHelpState> {
    cacheError: Error

    constructor(props: FormHelpProps) {
        super(props)

        this.state = {
            cacheError: undefined,
            cacheTip: undefined,
        }
    }

    componentDidUpdate(prevProps: Readonly<FormHelpProps>, prevState: Readonly<FormHelpState>, snapshot?: any): void {
        if (prevProps.error && !this.props.error) {
            this.setState({ cacheError: prevProps.error })
        } else if (prevState.cacheError) {
            setTimeout(() => {
                this.setState({ cacheError: undefined })
            }, FAST_TRANSITION_DURATION)
        }
    }

    render() {
        const { cacheError, cacheTip } = this.state

        const { error } = this.props

        if (cacheError || error) {
            return (
                <AnimationList
                    lazyDom
                    duration="fast"
                    className={formClass('error')}
                    animationTypes={['fade', 'scale-y']}
                    show
                >
                    {error?.message ?? cacheError?.message}
                </AnimationList>
            )
        }

        return null
    }
}
