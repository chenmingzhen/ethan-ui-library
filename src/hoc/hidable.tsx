// @ts-nocheck
import React from 'react'
import classnames from 'classnames'
import createReactContext from 'create-react-context'
import PropTypes from 'prop-types'
import { PureComponent } from '@/utils/component'
import { getUidStr } from '@/utils/uid'
import { hidableClass } from '@/styles'

const context = createReactContext()
export const consumer = Origin => props => (
    <context.Consumer>{value => <Origin {...value} {...props} />}</context.Consumer>
)

/**
 *
 * @param component
 * @param type fade, collapse, translate
 * @param duration
 * @param display
 */
export default function(Component, { type = ['fade'], duration = 360, display = 'block' }) {
    const hasCollapse = type.indexOf('collapse') >= 0
    const needTransform = type.indexOf('scale-y') >= 0

    class Hidable extends PureComponent {
        constructor(props) {
            super(props)
            // 控制动画
            this.state = {
                show: props.show,
            }
            this.height = 0
            this.id = `__hidable_${getUidStr()}__`
        }

        componentDidMount() {
            super.componentDidMount()
            // 获取当前元素的dom
            const el = this.getElement()
            if (!el) return

            // 已经是显示状态 不执行
            if (this.props.show) return

            // 获取当前容器的高度
            if (hasCollapse) this.height = el.offsetHeight

            // 隐藏
            el.style.display = 'none'

            // Dropdown 没有使用
            if (hasCollapse) {
                el.style.overflow = 'hidden'
                el.style.height = 0
            }
        }

        componentDidUpdate(prevProps) {
            // 根据show的变化 显示容器或者隐藏容器
            if (this.props.show === prevProps.show) return

            if (this.props.show) this.show()
            else this.hide()
        }

        getElement() {
            return document.querySelector(`.${this.id}`)
        }

        show() {
            const es = this.getElement().style
            es.display = display

            setTimeout(() => {
                if (this.$isMounted) {
                    this.setState({ show: true })

                    if (hasCollapse) {
                        es.height = `${this.height}px`

                        setTimeout(() => {
                            es.height = 'auto'
                            es.overflow = ''
                        }, duration)
                    }
                }
            }, 10)
        }

        hide() {
            this.setState({ show: false })
            const element = this.getElement()

            if (hasCollapse) {
                this.height = element.offsetHeight
                element.style.height = `${this.height}px`
                element.style.overflow = 'hidden'

                setTimeout(() => {
                    element.style.height = 0
                }, 10)
            }

            setTimeout(() => {
                if (this.state.show === false && element) {
                    element.style.display = 'none'
                }
            }, duration)
        }

        render() {
            let animation = `animation-${duration}`
            if (!needTransform) {
                animation = `fade-${animation}`
            }
            const className = classnames(
                // 控制动画
                hidableClass('_', ...type, animation, this.state.show && 'show'),
                this.props.className,
                this.id
            )
            const provider = { visible: this.state.show }

            // List 中没有使用value
            return (
                <context.Provider value={provider}>
                    <Component {...this.props} className={className} />
                </context.Provider>
            )
        }
    }

    Hidable.propTypes = {
        className: PropTypes.string,
        show: PropTypes.bool,
        height: PropTypes.number,
    }

    Hidable.defaultProps = {
        className: '',
        show: false,
    }

    return Hidable
}
