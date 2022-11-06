import React, { Children, cloneElement } from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import Card from './Card'

export interface AccordionProps {
    /** 提供受控的active */
    active?: string | number

    /** 默认的activi */
    defaultActive?: string | number

    /** 改变回调 */
    onChange(e: string | number | null): void
}

const getChildId = (child, i) => child?.props?.id ?? i

const Accordion: React.FC<AccordionProps> = ({ active: pActive, defaultActive = 0, onChange, children }) => {
    const [active, setActive] = React.useState<string | number | null>(pActive || defaultActive)

    const handleActive = React.useCallback(
        (newActive) => {
            if (newActive === active) newActive = null

            setActive(newActive)

            onChange?.(active)
        },
        [active, onChange]
    )

    React.useEffect(() => {
        pActive && setActive(pActive)
    }, [pActive])

    return (
        <>
            {Children.toArray(children).map((child: typeof Card, i) => {
                const childId = getChildId(child, i)
                const props = {
                    collapsed: active !== childId,
                    collapsible: true,
                    className: classnames(typeof child === 'object' && child.className, cardClass('accordion')),
                    onCollapse: handleActive.bind(null, childId),
                }
                return cloneElement(child, props)
            })}
        </>
    )
}

export default React.memo(Accordion)
