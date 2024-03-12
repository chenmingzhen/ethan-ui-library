import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty } from '@/utils/is'
import Loading from './loading'

interface Config {
    visible?: boolean
    percent?: number
    height?: number
    color?: string
}

const LOADING_INTERVAL = 200
const WIDTH_ANIMATION_DURATION = 200
const OPACITY_ANIMATION_DURATION = 480

class LoadingManager {
    visible = true

    percent = 0

    height = 4

    color = '#3399ff'

    container = document.createElement('div')

    intervalTimer: NodeJS.Timer

    hideTimer: NodeJS.Timer

    destroyTimer: NodeJS.Timer

    goTimer: NodeJS.Timer

    isRendered = false

    /**
     * 清除所有计时器
     */
    ensureEmptyTimer = () => {
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer)
            this.intervalTimer = null
        }

        if (this.hideTimer) {
            clearTimeout(this.hideTimer)
            this.hideTimer = null
        }

        if (this.destroyTimer) {
            clearTimeout(this.destroyTimer)
            this.destroyTimer = null
        }

        if (this.goTimer) {
            clearTimeout(this.goTimer)
            this.goTimer = null
        }
    }

    /**
     * 配置进度条属性
     */
    setConfig = (config: Config) => {
        Object.keys(config).forEach((key) => {
            if (isEmpty(config[key])) return

            this[key] = config[key]
        })
    }

    /**
     * 开始进度条
     */
    start = () => {
        this.visible = true
        this.percent = 0
        this.render()

        this.loading()
    }

    /**
     * 完成进度条
     */
    finish = () => {
        this.ensureEmptyTimer()

        this.percent = 100
        this.render()

        this.hideTimer = setTimeout(() => {
            this.visible = false
            this.render()
        }, WIDTH_ANIMATION_DURATION)

        this.destroyTimer = setTimeout(this.destroy, OPACITY_ANIMATION_DURATION)
    }

    /**
     * 移动到指定位置
     */
    go = (percent: number) => {
        this.ensureEmptyTimer()

        this.visible = true

        const jumpTo = () => {
            this.percent = percent
            this.render()
        }

        if (!this.isRendered) {
            /** 先让组件挂载 */
            this.render()

            /** 等待组件挂载后再设置位置 */
            this.goTimer = setTimeout(jumpTo)
        } else {
            jumpTo()
        }
    }

    /**
     * 进度条移动
     */
    loading = () => {
        this.ensureEmptyTimer()

        this.intervalTimer = setInterval(() => {
            this.percent = Math.min(Math.floor(Math.random() * +5) + this.percent, 100)

            this.render()

            if (this.percent === 100) {
                this.ensureEmptyTimer()
            }
        }, LOADING_INTERVAL)
    }

    /**
     * 销毁进度条
     */
    destroy = () => {
        this.ensureEmptyTimer()
        this.isRendered = false
        this.visible = false
        this.percent = 0

        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container)
            if (this.container.parentElement) {
                this.container.parentElement.removeChild(this.container)
            }
        }
    }

    /**
     * 渲染进度条
     */
    render = () => {
        const { visible, percent, height, color } = this

        if (!this.isRendered) {
            document.body.appendChild(this.container)
        }

        ReactDOM.render(
            <Loading visible={visible} percent={percent} height={height} color={color} />,
            this.container,
            () => {
                this.isRendered = true
            }
        )
    }
}

export default new LoadingManager()
