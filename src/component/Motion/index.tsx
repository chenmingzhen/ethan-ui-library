/** @see https://github.com/react-component/motion */
import React, { cloneElement, isValidElement, useRef } from 'react'
import { isFunc } from '@/utils/is'
import classnames from 'classnames'
import useRefMethod from '@/hooks/useRefMethod'
import { MotionProps, MotionStatus, MotionStep } from './type'
import useStatus from './hooks/useStatus'

const eventSteps = [MotionStep.START, MotionStep.ACTIVE, MotionStep.END]

function getMotionClassName(motionName: string, status: MotionStatus, step: MotionStep, leaveClassName: string) {
    if (!motionName) return undefined

    if (status === MotionStatus.IGNORE_ENTER) return undefined

    if (status === MotionStatus.IGNORE_LEAVE) return leaveClassName

    if (status === MotionStatus.ENTER && step === MotionStep.PREPARE) return leaveClassName

    if (step === MotionStep.NONE && status === MotionStatus.LEAVE) {
        return leaveClassName
    }

    if (eventSteps.includes(step)) {
        return classnames(`${motionName}`, `${motionName}-${status}`, `${motionName}-${status}-${step}`)
    }

    return undefined
}

const Motion: React.FC<MotionProps> = function (props) {
    const {
        destroyOnLeave,
        leaveClassName,
        children,
        name = '',
        visible,
        enter,
        onEnterStart,
        onEnterActive,
        onEnterEnd,
        leave,
        onLeaveStart,
        onLeaveActive,
        onLeaveEnd,
        enterDelay,
        leaveDelay,
    } = props
    const transitionDOMRef = useRef<HTMLElement>()
    const getElement = useRefMethod(() => transitionDOMRef.current)
    const isRender = useRef(false)

    const [status, step] = useStatus({
        getElement,
        visible,
        enter,
        leave,
        enterDelay,
        onEnterStart,
        onEnterActive,
        onEnterEnd,
        leaveDelay,
        onLeaveStart,
        onLeaveActive,
        onLeaveEnd,
        destroyOnLeave,
    })

    let mergeChild: React.ReactNode

    if (
        !children ||
        // 初始状态或者是隐藏销毁
        status === MotionStatus.NONE ||
        // 如果DOM未构建，且处于准备状态，先不用提前把DOM渲染出来，等待开始动画时再将DOM渲染出来
        (!isRender.current && step === MotionStep.PREPARE)
    ) {
        isRender.current = false

        mergeChild = null
    } else {
        isRender.current = true

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
                ref: transitionDOMRef,
            })
        }
    }

    return <>{mergeChild}</>
}

export default React.memo(Motion)
