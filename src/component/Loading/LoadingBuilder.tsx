import React from 'react'
import ReactDOM from 'react-dom'
import Loading from './Loading'
import { LoadingProps, LoadingInstance } from './type'

class LoadingBuilder {
    private WIDTH_ANIMATION_DURATION = 200

    private OPACITY_ANIMATION_DURATION = 500

    private PATCH_DURATION = 200

    private loadingInstance: LoadingInstance

    private cacheProps: LoadingProps

    private container: HTMLDivElement

    private timer: NodeJS.Timer

    private init = async (onInitFinish?: () => void) => {
        if (!this.loadingInstance) {
            this.container = document.createElement('div')

            document.body.appendChild(this.container)
            ReactDOM.render(
                <Loading
                    {...(this.cacheProps || {})}
                    ref={(loadingInstance) => {
                        this.loadingInstance = loadingInstance
                    }}
                />,
                this.container,
                onInitFinish
            )

            /** clear */
            this.cacheProps = null
        }
    }

    private ensureEmptyTimer = () => {
        if (this.timer) {
            clearInterval(this.timer)

            this.timer = null
        }
    }

    start = () => {
        this.init(() => {
            this.dispatchLoading()
        })
    }

    go = (percent: number) => {
        this.ensureEmptyTimer()
        const done = percent === 100

        if (this.loadingInstance) {
            this.loadingInstance.updateState(
                this.cacheProps ? { ...this.cacheProps, visible: true, percent } : { visible: true, percent }
            )

            this.cacheProps = null

            if (done) {
                this.finish()
            }
        } else {
            this.init(() => {
                /** init animation,from zero to percent transition */
                this.loadingInstance.updateState({ visible: true, percent: 0 })

                if (done) {
                    setTimeout(this.finish)
                } else {
                    setTimeout(() => {
                        if (!this.loadingInstance) return
                        this.loadingInstance.updateState({ visible: true, percent })
                    })
                }
            })
        }
    }

    finish = () => {
        if (!this.loadingInstance) return

        this.ensureEmptyTimer()

        this.loadingInstance.updateState({ percent: 100 })

        setTimeout(() => {
            if (!this.loadingInstance) return
            this.loadingInstance.updateState({ visible: false })
        }, this.WIDTH_ANIMATION_DURATION)

        setTimeout(() => {
            this.destroy()
        }, this.OPACITY_ANIMATION_DURATION)
    }

    config = (props?: LoadingProps) => {
        /** 实例不一定存在，先存储值，start或upload时再设置到实例中 */
        this.cacheProps = props
    }

    private dispatchLoading = () => {
        let lastPercent

        this.timer = setInterval(() => {
            this.loadingInstance.updateState((state) => {
                lastPercent = Math.min(Math.floor(Math.random() * +5) + state.percent, 100)

                return {
                    ...state,
                    percent: lastPercent,
                }
            })

            if (lastPercent === 100) {
                this.ensureEmptyTimer()
            }
        }, this.PATCH_DURATION)
    }

    private destroy = () => {
        this.loadingInstance = null
        this.ensureEmptyTimer()

        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container)

            if (this.container.parentElement) {
                this.container.parentElement.removeChild(this.container)
            }
        }
    }
}

export default new LoadingBuilder()
