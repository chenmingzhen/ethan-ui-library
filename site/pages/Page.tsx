import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import { Sticky } from 'ethan-ui'
import locate from 'doc/utils/locate'
import Loading from 'docs/Loading'
import { mainClass } from 'doc/styles'
import Icon from '../icons/Icon'

interface Page {
    name: string
    cn: string
    level: number
    component: React.LazyExoticComponent<React.NamedExoticComponent>
}

const filters = ['Datum.Form', 'Datum.List']

function getUrl(base: string, page: Page) {
    return `${base}/${page.name}`
}

function PageHOC(pages: (Page | string)[]) {
    function Page(props) {
        const base = props.match.url
        // 右下角汉堡菜单
        const [hideMiniNav, updateMiniNav] = useState(window.innerWidth < 979)

        const menuDOMRef = useRef<HTMLDivElement>()

        const toggleCode = () => {
            if (window.innerWidth > 979) return

            const menuElement = menuDOMRef.current

            const isHide = !hideMiniNav

            updateMiniNav(isHide)

            if (isHide) {
                updateMiniNav(isHide)

                setTimeout(() => {
                    menuElement.style.display = 'none'
                }, 400)
            } else {
                setTimeout(() => updateMiniNav(isHide), 16)

                menuElement.style.display = 'block'
            }
        }

        useEffect(() => {
            const changeNav = () => {
                updateMiniNav(window.innerWidth < 979)
            }

            window.addEventListener('resize', changeNav)

            return () => window.removeEventListener('resize', changeNav)
        }, [])

        // <NavLink>是<Link>的一个特定版本，会在匹配上当前的url的时候给已经渲染的元素添加参数

        /**
         * tabIndex
         * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex
         * */
        return (
            <>
                <div tabIndex={-1} className={mainClass('nav-open-close')}>
                    <Icon name={hideMiniNav ? 'Menu' : 'close'} onClick={toggleCode} />
                </div>

                <Sticky top={0} style={{ borderRight: '1px solid #e8e8e8' }}>
                    <div ref={menuDOMRef} className={mainClass('menu', hideMiniNav && 'hidden')}>
                        {pages
                            .filter((page) => typeof page !== 'string' && filters.indexOf(page.name) === -1)
                            .map((page, index) =>
                                /* 标题 */
                                typeof page === 'string' ? (
                                    <span key={index}>{page}</span>
                                ) : (
                                    <NavLink
                                        className={mainClass(page.level === 2 && 'sub')}
                                        activeClassName={mainClass('active')}
                                        key={page.name}
                                        to={getUrl(base, page)}
                                        onClick={toggleCode}
                                    >
                                        <p>
                                            {page.name}
                                            <span style={{ margin: '0 0 0 6px' }}>{locate(page.cn)}</span>
                                        </p>
                                    </NavLink>
                                )
                            )}
                    </div>
                </Sticky>

                <div className={mainClass('page')}>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            {pages
                                .filter((p) => typeof p === 'object')
                                .map((p: Page) => (
                                    <Route
                                        key={p.name}
                                        path={getUrl(base, p)}
                                        component={p.component}
                                        onEnter={toggleCode}
                                    />
                                ))}
                        </Switch>
                    </Suspense>
                </div>
            </>
        )
    }

    return React.memo(Page)
}

export default PageHOC
