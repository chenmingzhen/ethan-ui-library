import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Dropdown, Menu } from '@/index'
import themes from 'doc/enum/themes'
import theme from 'doc/utils/theme'
import Icon from '../icons/Icon'
import { headerClass } from '../styles'
import history from './history'
import locate, { getLanguage, setItem, STORAGE_KEY } from '../utils/locate'

const Logo = require('../images/ui.png')

const findLangs = () => {
  const prevLang = locate('cn', 'en')
  const nextLang = locate('en', 'cn')
  const itemLang = locate('en-US', 'zh-CN')

  return [prevLang, nextLang, itemLang]
}

const handleThemeClick = data => {
  window.location.href = `?theme=${data.content}${window.location.hash}`
}

const Header = () => {
  const navs = [
    { path: '/index/', en: 'Home', cn: '首页' },
    { path: '/components/Start', en: 'Components', cn: '组件' },
  ]

  const [currentPath, setPath] = useState(navs[0].path)

  const location = useLocation()

  const handleNavClick = useCallback(nav => {
    history.push(`${nav.path}`)
  }, [])

  const checkActive = useCallback(d => currentPath === d.path, [currentPath])

  const handleLangClick = () => {
    const langs = findLangs()
    const href = window.location.href.replace(`/${langs[0]}`, `/${langs[1]}`)

    setItem(STORAGE_KEY, langs[2])
    window.location = href
  }

  useEffect(() => {
    setPath(location.pathname.indexOf('/index/') !== -1 ? navs[0].path : navs[1].path)

    const unListen = history.listen(loc => {
      setPath(loc.pathname.indexOf('/index/') !== -1 ? navs[0].path : navs[1].path)
    })

    return () => {
      unListen()
    }
  }, [])

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
          renderItem={d => (getLanguage() === 'zh-CN' ? d.cn : d.en)}
          onClick={handleNavClick}
          inlineIndent={24}
          style={{ background: 'transparent', border: 'none' }}
          active={checkActive}
        />
      </div>
      <div className={headerClass('right')}>
        <Button size="small" onClick={handleLangClick} style={{ margin: '0 12px' }}>
          {locate('English', '中文')}
        </Button>

        <Dropdown
          className={headerClass('light')}
          data={themes}
          onClick={handleThemeClick}
          trigger="hover"
          placeholder={`theme: ${theme.getTheme()}`}
          size="small"
        />

        <Button type="link" style={{ color: '#666' }} href="https://github.com/chenmingzhen/ethan-ui-library">
          <Icon name="github" />
          &nbsp;GitHub
        </Button>
      </div>
    </div>
  )
}

export default Header
