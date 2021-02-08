import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Menu } from 'ethan/index'
import logo from './icons/logo'
import Icon from './icons/Icon'
import { headerClass } from './styles'
import history from './history'

const Logo = require('./images/ui.png')

const Header = () => {
  const navs = [
    { path: '/index/', en: 'Home', cn: '首页' },
    { path: '/components/GetStart', en: 'Components', cn: '组件' },
    { path: '/documentation/Props', en: '', cn: '杂项' },
  ]

  const [currentPath, setPath] = useState(navs[0].path)

  const { pathname } = window.location

  const handleNavClick = useCallback(nav => {
    setPath(nav.path)
    history.push(`${nav.path}`)
  }, [])

  const checkActive = useCallback(d => currentPath === d.path, [currentPath])

  return (
    <div className={headerClass('_')}>
      <div className={headerClass('logo')}>
        <img src={Logo} alt="" />
        <Link to="/index/">Ethan</Link>
      </div>
      <div className={headerClass('nav')}>
        <Menu
          mode="horizontal"
          keygen="path"
          data={navs}
          renderItem={d => d.cn}
          onClick={handleNavClick}
          inlineIndent={24}
          style={{ background: 'transparent', border: 'none' }}
          active={checkActive}
        />
      </div>
      <div className={headerClass('right')}>
        <Button type="link" style={{ color: '#666' }} href="https://github.com/chenmingzhen/ethan-ui-library">
          <Icon name="github" />
          &nbsp;GitHub
        </Button>
      </div>
    </div>
  )
}

export default Header
