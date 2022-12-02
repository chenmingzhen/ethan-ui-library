import immer from 'immer'
import React from 'react'
import { EComponent, EPureComponent } from './type'

function create(name: 'PureComponent' | 'Component') {
    const Base = React[name]

    return class extends Base {
        $isMounted

        forceUpdateTimer

        componentDidMount() {
            this.$isMounted = true
        }

        componentWillUnmount() {
            this.$isMounted = false
        }

        setState = (...args) => {
            if (this.$isMounted !== false) super.setState(...args)
        }

        setDraftState = (fn, callback) => {
            this.setState(immer(fn), callback)
        }

        forceUpdate = () => {
            if (this.forceUpdateTimer) {
                clearTimeout(this.forceUpdateTimer)

                this.forceUpdateTimer = null
            }

            if (this.$isMounted === true) super.forceUpdate()
        }
    }
}

export const Component = create('Component') as unknown as typeof EComponent
export const PureComponent = create('PureComponent') as unknown as typeof EPureComponent

export default create
