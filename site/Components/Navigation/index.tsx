import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-use'
import { navClass } from 'doc/styles'
import { Sticky } from 'ethan-ui'
import useRefMethod from '@/hooks/useRefMethod'
import history from '../history'
import NavigationContext, { Heading } from './context'

interface NavigationProps {
    children: React.ReactNode
}

const Navigation: React.FC<NavigationProps> = function (props) {
    const { children } = props
    const [active, setActive] = useState('')
    const [headings, setHeadings] = useState<Heading[]>([])
    const location = useLocation()
    const { hash } = location

    const scrollTo = useRefMethod((id: string) => {
        history.push(`${history.location.pathname}#${id}`)

        const element = document.getElementById(id)

        element?.scrollIntoView()
    })

    const handleScroll = useRefMethod(() => {
        const top = document.documentElement.scrollTop
        const exampleHeadings = headings.filter((heading) => heading.level === 3 && heading.children.length)

        if (exampleHeadings.length === 0) return

        let nextActive = exampleHeadings[0].id

        exampleHeadings.forEach((h) => {
            const el = document.querySelector(`#${h.id}`) as HTMLElement

            if (el?.offsetTop <= top) nextActive = h.id
        })

        setActive(nextActive)
    })

    useEffect(() => {
        handleScroll()

        if (hash) {
            const element = document.querySelector(hash)

            setTimeout(() => {
                element?.scrollIntoView()
            }, 20)
        }

        document.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [headings])

    const value = React.useMemo(() => ({ setHeadings }), [])

    return (
        <div className={navClass('_')}>
            <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>

            <Sticky className={navClass('sticky')} top={50}>
                <div className={navClass('nav')}>
                    {headings.map((heading, index) => {
                        const content = heading.children.filter((c) => typeof c === 'string')

                        return (
                            <a
                                key={index}
                                className={navClass(`level-${heading.level}`, active === heading.id && 'active')}
                                onClick={scrollTo.bind(null, heading.id)}
                            >
                                {content}
                            </a>
                        )
                    })}
                </div>
            </Sticky>
        </div>
    )
}

export default React.memo(Navigation)
