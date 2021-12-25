import { isEmpty } from '@/utils/is'
import React from 'react'
import ReactDOM from 'react-dom'
import Loading from './loading'
import { LineLoadingProps, LoadingInstance, FullScreenProps, LoadingFunction } from './type'

let lineLoadingRef: React.RefObject<LoadingInstance>

let fullScreenLoadingRef: React.RefObject<LoadingInstance>

let lineTimer: NodeJS.Timeout = null

let lineRoot: HTMLDivElement = null

let fullScreenRoot: HTMLDivElement = null

let cacheConfig = {}

function createLineDOMAndRender(callback, props?: LineLoadingProps) {
    if (lineTimer) {
        clearInterval(lineTimer)

        lineTimer = null
    }

    if (!lineLoadingRef) {
        lineLoadingRef = React.createRef()

        const mergeProps = Object.assign({}, cacheConfig, props)

        // props会为空 需要手动update 设置值进去
        const lineLoading = React.createElement(
            Loading,
            Object.assign({ ...mergeProps, ref: lineLoadingRef, visible: true })
        )

        lineRoot = document.createElement('div')

        document.body.appendChild(lineRoot)

        ReactDOM.render(lineLoading, lineRoot, callback)
    }
}

function createFullScreenDOMAndRender(props?: FullScreenProps) {
    if (!fullScreenLoadingRef) {
        fullScreenLoadingRef = React.createRef()

        const fullScreenLoading = React.createElement(
            Loading,
            Object.assign({ ...props, ref: fullScreenLoadingRef, visible: true })
        )

        fullScreenRoot = document.createElement('div')

        document.body.appendChild(fullScreenRoot)

        ReactDOM.render(fullScreenLoading, fullScreenRoot)
    }
}

function dispatchLineLoading() {
    const { updatePercent } = lineLoadingRef.current

    lineTimer = setInterval(() => {
        updatePercent(lastPercent => {
            const percent = Math.min(Math.floor(Math.random() * +5) + lastPercent, 99.9)

            return percent
        })
    }, 200)
}

const loadingFunc: LoadingFunction = {
    fullScreen(props?: FullScreenProps) {
        createFullScreenDOMAndRender(props)

        function config(configProps: FullScreenProps) {
            const { updateFullScreenConfig } = fullScreenLoadingRef.current

            updateFullScreenConfig(configProps)
        }

        function destroy() {
            ReactDOM.unmountComponentAtNode(fullScreenRoot)

            document.body.removeChild(fullScreenRoot)

            fullScreenLoadingRef = null
        }

        return {
            config,
            destroy,
        }
    },

    start(props?: LineLoadingProps) {
        const renderCallback = () => {
            const { updateVisible } = lineLoadingRef.current

            dispatchLineLoading()

            updateVisible(true)
        }

        createLineDOMAndRender(renderCallback, props)
    },

    finish() {
        if (!lineLoadingRef?.current) return

        if (lineTimer) {
            clearInterval(lineTimer)

            lineTimer = null
        }

        const { updatePercent, updateVisible } = lineLoadingRef.current

        updatePercent(100)
        updateVisible(true)
    },

    upload(percent: number) {
        function batchUpdate() {
            const { updatePercent, updateVisible } = lineLoadingRef.current

            ReactDOM.unstable_batchedUpdates(() => {
                updatePercent(percent)
                updateVisible(true)
            })
        }

        if (!lineLoadingRef) {
            const renderCallback = () => {
                const { updatePercent } = lineLoadingRef.current

                /** init animation,from zero to percent transition */
                updatePercent(0)

                setTimeout(batchUpdate)
            }

            createLineDOMAndRender(renderCallback)
        } else {
            const { updateLineConfig } = lineLoadingRef.current

            if (!isEmpty(cacheConfig)) {
                updateLineConfig(cacheConfig)
            }

            batchUpdate()
        }
    },

    config(props: LineLoadingProps) {
        cacheConfig = props
    },

    clear() {
        cacheConfig = {}
    },

    destroy() {
        if (lineRoot) {
            ReactDOM.unmountComponentAtNode(lineRoot)
        }

        lineLoadingRef = null
    },
}

export default loadingFunc
