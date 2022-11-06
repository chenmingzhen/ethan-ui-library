import React, { useState, useEffect } from 'react'
import { Sticky } from 'ethan-ui'
import { useLocation } from 'react-use'
import { navClass } from 'doc/styles'
import { Heading } from 'doc/type'
import history from '../history'

const scrollTo = (id) => {
    const isSingleMode = history.location.search.indexOf('?example=') === 0

    if (isSingleMode) {
        history.push(`${history.location.pathname}?example=${id.replace('heading-', '')}`)
    } else {
        history.push(`${history.location.pathname}#${id}`)

        const element = document.getElementById(id)

        element?.scrollIntoView()
    }
}

interface NavProps {
    noNav?: boolean
}

const Navable = (Component: React.ComponentType<{ onHeadingSet: (heading: Heading[]) => void }>) => {
    const Nav: React.FC<NavProps> = ({ noNav }) => {
        const [active, setActive] = useState('')

        const [headings, setHeadings] = useState<Heading[]>([])

        const location = useLocation()

        const { hash } = location

        useEffect(() => {
            function handleScroll() {
                const top = document.documentElement.scrollTop

                const hasChildrenHeading = headings.filter((heading) => heading.level === 3 && heading.children.length)

                if (hasChildrenHeading.length === 0) return

                let newActive = hasChildrenHeading[0].id

                hasChildrenHeading.forEach((h) => {
                    const el = document.querySelector(`#${h.id}`) as HTMLElement

                    if (el?.offsetTop <= top) newActive = h.id
                })

                setActive(newActive)
            }

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

        const renderNav = () => (
            <Sticky className={navClass('sticky')} top={50}>
                <div className={navClass('nav')}>
                    {headings.map((heading, index) => {
                        const children = heading.children.filter((c) => typeof c === 'string')

                        return (
                            <a
                                key={index}
                                className={navClass(`level-${heading.level}`, active === heading.id && 'active')}
                                onClick={scrollTo.bind(null, heading.id)}
                            >
                                {children}
                            </a>
                        )
                    })}
                </div>
            </Sticky>
        )
        return (
            <div className={navClass('_')}>
                <Component onHeadingSet={setHeadings} />

                {!noNav && renderNav()}
            </div>
        )
    }

    return React.memo(Nav)
}

export default Navable
