import React, { cloneElement, isValidElement, useRef } from 'react'
import { isFunc } from '@/utils/is'
import classnames from 'classnames'
import useRefMethod from '@/hooks/useRefMethod'
import { MotionProps, MotionStatus, MotionStep } from './type'
import useStatus from './hooks/useStatus'

/** 可执行动画的阶段 */
const animationSteps = [MotionStep.START, MotionStep.ACTIVE, MotionStep.END]

function getMotionClassName(motionName: string, status: MotionStatus, step: MotionStep, leaveClassName: string) {
    if (!motionName) return undefined

    /** 如果忽略进场动画，则不做任何处理 */
    if (status === MotionStatus.IGNORE_ENTER) return undefined

    /** 如果忽略退场动画，返回退场之后样式名称 */
    if (status === MotionStatus.IGNORE_LEAVE) return leaveClassName

    /** 已完成退场动画，直接返回退场之后的样式名称 */
    if (step === MotionStep.NONE && status === MotionStatus.LEAVE) {
        return leaveClassName
    }

    if (animationSteps.includes(step)) {
        return classnames(`${motionName}`, `${motionName}-${status}`, `${motionName}-${status}-${step}`)
    }

    return undefined
}

const Motion: React.FC<MotionProps> = function (props) {
    const {
        destroyAfterLeave,
        leaveClassName,
        children,
        name = '',
        visible,
        enter,
        onEnterPrepare,
        onEnterStart,
        onEnterActive,
        onEnterEnd,
        leave,
        onLeavePrepare,
        onLeaveStart,
        onLeaveActive,
        onLeaveEnd,
    } = props
    const transitionDOMRef = useRef<HTMLElement>()
    const getElement = useRefMethod(() => transitionDOMRef.current)

    const bindChildrenElement = useRefMethod((element) => {
        transitionDOMRef.current = element

        const forwardedRef = isValidElement(children) ? (children as any).ref : undefined

        if (typeof forwardedRef === 'function') {
            forwardedRef(element)
        } else if (forwardedRef && Object.prototype.hasOwnProperty.call(forwardedRef, 'current')) {
            forwardedRef.current = element
        }
    })

    const [status, step] = useStatus({
        getElement,
        visible,
        enter,
        leave,
        onEnterPrepare,
        onEnterStart,
        onEnterActive,
        onEnterEnd,
        onLeavePrepare,
        onLeaveStart,
        onLeaveActive,
        onLeaveEnd,
        destroyAfterLeave,
    })

    let mergeChild: JSX.Element

    if (
        !children ||
        // 初始状态或者是隐藏销毁
        status === MotionStatus.NONE
    ) {
        mergeChild = null
    } else {
        const cls = getMotionClassName(name, status, step, leaveClassName)

        if (isFunc(children)) {
            mergeChild = children(
                {
                    className: cls,
                },
                transitionDOMRef
            )
        } else if (isValidElement(children)) {
            mergeChild = cloneElement(children as any, {
                className: children.props.className || cls ? classnames(children.props.className, cls) : undefined,
                ref: bindChildrenElement,
            })
        }
    }

    return mergeChild
}

export default React.memo(Motion)
