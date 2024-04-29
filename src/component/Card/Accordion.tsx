import React, { Children, cloneElement } from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import useMergedValue from '@/hooks/useMergedValue'
import { AccordionProps } from './type'

const getChildId = (child, i) => child?.props?.id ?? i

const Accordion: React.FC<AccordionProps> = (props) => {
    const { defaultActive = 0, onChange, children } = props

    const [active, setActive] = useMergedValue({
        defaultStateValue: null,
        options: {
            defaultValue: defaultActive,
            value: props.active,
            onChange,
        },
    })

    const handleActive = useRefMethod((nextActive) => {
        if (nextActive === active) nextActive = null

        setActive(nextActive)
    })

    return (
        <>
            {Children.toArray(children).map((child, i) => {
                if (!React.isValidElement(child)) {
                    // 如果child不是一个有效的React元素，则跳过本次迭代
                    return null
                }

                const childId = getChildId(child, i)
                const childProps = {
                    collapsed: active !== childId,
                    collapsible: true,
                    className: classnames(typeof child === 'object' && child.props?.className, cardClass('accordion')),
                    onCollapse: () => {
                        handleActive(childId)
                    },
                }
                return cloneElement(child, childProps)
            })}
        </>
    )
}

export default React.memo(Accordion)
