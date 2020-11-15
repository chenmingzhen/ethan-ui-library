import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Button, Dropdown } from 'ethan/index'
import docsearch from 'docsearch.js'
import { Link } from 'react-router-dom'
import FontAwesome from './pages/components/Icon/FontAwesome'
import logo from './icons/logo'
import Icon from './icons/Icon'
import { headerClass } from './styles'
import history from './history'

const Header = ({ versions }) => {
  // const path = getPath(this.context.location.pathname)
  const path = ''

  const navs = [
    { path: '/index/', en: 'Home', cn: '首页' },
    { path: '/components/GetStart', en: 'Components', cn: '组件' },
    { path: '/documentation/Props', en: '', cn: '杂项' },
  ]

  const { pathname } = window.location
  let version = versions.find(v => pathname.indexOf(v.content) >= 0)
  if (version) version = version.content

  const searchInput = !version || version === (versions[versions.length - 1] || {}).content

  // useEffect(() => {
  //   if (searchInput) {
  //     docsearch({
  //       appId: 'T20UAXDNF8',
  //       apiKey: '0bd92ae792815ca5cb44b9e0f392fa8c',
  //       indexName: process.env.LOG_ENV === 'rc' ? `shineout-rc` : `shineout`,
  //       inputSelector: '#algolia-doc-search',
  //       algoliaOptions: { facetFilters: [`lang: ${locate('cn', 'en')}`] },
  //       debug: false, // Set debug to true if you want to inspect the dropdown
  //     })
  //   }
  // }, [])

  return (
    <div className={headerClass('_')}>
      <div className={headerClass('logo')}>
        <Link to="/index/">{logo}</Link>
      </div>
      <div className={headerClass('nav')}>
        {navs.map(nav => (
          <NavLink key={nav.path} to={nav.path} className={headerClass(path === nav.path && 'active')}>
            {nav.cn}
          </NavLink>
        ))}
      </div>
      {searchInput && (
        <div className={headerClass('docsearch')}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="algolia-doc-search">
            <FontAwesome name="search" className={headerClass('icon')} />
          </label>
          <input placeholder="搜索" className={headerClass('search')} id="algolia-doc-search" width={220} />
        </div>
      )}
      <div className={headerClass('right')}>
        {version && (
          <Dropdown
            className={headerClass('light')}
            data={versions}
            trigger="hover"
            placeholder={version}
            size="small"
            style={{ marginRight: 12 }}
          />
        )}

        <Button type="link" style={{ color: '#666' }} href="https://github.com/sheinsight/shineout">
          <Icon name="github" />
          &nbsp;GitHub
        </Button>
      </div>
    </div>
  )
}

Header.propTypes = {
  versions: PropTypes.array,
}

export default Header
