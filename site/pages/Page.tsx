import React, { Suspense, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import { Route, Switch, NavLink } from 'react-router-dom'
import { Sticky } from 'ethan/index'
import locate from 'doc/utils/locate'
import Loading from 'docs/Loading'
import { mainClass } from 'doc/styles'
import Icon from '../icons/Icon'

const filters = ['Datum.Form', 'Datum.List']

function getUrl(base, page) {
  if (page.path === '') return base
  return `${base}/${page.path || page.name}`
}

export default function(pages) {
  function Page(props) {
    const base = props.match.url
    const location = useLocation()
    const { search } = location

    if (search?.indexOf('?example=') === 0) search.replace('?example=', '')

    // 右下角汉堡菜单
    const [shownav, setShowNav] = useState(window.innerWidth < 979)

    const toggleCode = () => {
      if (window.innerWidth > 979) return

      // 小屏下的处理
      const el = document.querySelector('#-ethan-menu')
      const showNav = !shownav

      if (showNav) {
        setShowNav(showNav)
        setTimeout(() => {
          if (el) el.style.display = 'none'
        }, 400)
      } else {
        setTimeout(() => setShowNav(showNav), 16)
        if (el) el.style.display = 'block'
      }
    }

    useEffect(() => {
      const changeNav = () => {
        setShowNav(window.innerWidth < 979)
      }

      window.addEventListener('resize', changeNav)

      return () => window.removeEventListener('resize', changeNav)
    }, [])

    // <NavLink>是<Link>的一个特定版本，会在匹配上当前的url的时候给已经渲染的元素添加参数

    return (
      <>
        {/* 汉堡菜单 */}
        <div tabIndex="-1" className={mainClass('nav-open-close')}>
          <Icon name={shownav ? 'Menu' : 'close'} onClick={toggleCode} />
        </div>

        <Sticky top={0} style={{ borderRight: '1px solid #e8e8e8' }}>
          <div id="-ethan-menu" className={mainClass('menu', shownav && 'hidden')}>
            {pages
              .filter(v => filters.indexOf(v.name) === -1)
              .map((p, i) =>
                /* 标题 */
                typeof p === 'string' ? (
                  // eslint-disable-next-line
                  <label key={i}>{p}</label>
                ) : (
                  <NavLink
                    className={mainClass(p.level === 2 && 'sub')}
                    activeClassName={mainClass('active')}
                    key={p.name}
                    to={getUrl(base, p)}
                    onClick={toggleCode}
                  >
                    <p>
                      {p.name}
                      <span style={{ margin: '0 0 0 6px' }}>{locate(p.cn)}</span>
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
                .filter(p => typeof p === 'object')
                .map(p => (
                  <Route
                    key={p.name + search}
                    path={getUrl(base, p)}
                    component={p.component}
                    onEnter={() => {
                      toggleCode.bind(null)
                    }}
                  />
                ))}
            </Switch>
          </Suspense>
        </div>
      </>
    )
  }

  Page.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object.isRequired,
  }

  return Page
}
