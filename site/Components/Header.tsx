import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Menu } from '@/index'
import themes from 'doc/enum/themes'
import theme from 'doc/utils/theme'
import useVersion from '../hooks/useVersion'
import useNav, { NavMenuData } from '../hooks/useNav'
import Icon from '../icons/Icon'
import { headerClass } from '../styles'
import history from './history'
import locate, { getLanguage, setItem, STORAGE_KEY } from '../utils/locate'
import ThemeEditor from './ThemeEditor'

const findLangs = () => {
    const prevLang = locate('cn', 'en')
    const nextLang = locate('en', 'cn')
    const itemLang = locate('en-US', 'zh-CN')

    return [prevLang, nextLang, itemLang]
}

const handleThemeSelect = (data) => {
    window.location.href = `?theme=${data.content}${window.location.hash}`
}

const Header = () => {
    const { initPath, navs } = useNav()

    const [version, versions] = useVersion()

    const handleNavClick = useCallback((nav) => {
        history.push(`${nav.path}`)
    }, [])

    const handleSelect = () => {
        const langs = findLangs()

        const href = window.location.href.replace(`/${langs[0]}`, `/${langs[1]}`)

        setItem(STORAGE_KEY, langs[2])

        window.location = href as unknown as Location
    }

    const handleVersionClick = (item) => {
        window.open(item.url, '_self')
    }

    return (
        <div className={headerClass('_')}>
            <div className={headerClass('logo')}>
                <img src="https://chenmingzhen.github.io/ethan-ui-library/images/ui.png" alt="" />
                <Link to="/home/">Ethan</Link>
            </div>
            <div className={headerClass('nav')}>
                <Menu<NavMenuData>
                    mode="horizontal"
                    data={navs}
                    renderItem={(d) => <Link to={d.path}>{getLanguage() === 'zh-CN' ? d.cn : d.en}</Link>}
                    onSelect={handleNavClick}
                    inlineIndent={24}
                    style={{ background: 'transparent', border: 'none' }}
                    activeKey={initPath}
                />
            </div>
            <div className={headerClass('right')}>
                <Button size="small" onClick={handleSelect} style={{ margin: '0 12px' }}>
                    {locate('English', '中文')}
                </Button>

                {version && (
                    <Dropdown trigger="hover" menu={{ data: versions, onSelect: handleVersionClick }}>
                        <Button size="small" style={{ marginRight: 12 }}>
                            {version}
                        </Button>
                    </Dropdown>
                )}

                <Dropdown menu={{ data: themes, onSelect: handleThemeSelect }} trigger="hover">
                    <Button size="small">{`theme: ${theme.getTheme()}`}</Button>
                </Dropdown>

                <Button type="link" style={{ color: '#666' }} href="https://github.com/chenmingzhen/ethan-ui-library">
                    <Icon name="github" />
                    &nbsp;GitHub
                </Button>

                <ThemeEditor />
            </div>
        </div>
    )
}

export default React.memo(Header)
