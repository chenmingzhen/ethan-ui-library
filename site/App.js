import React, { useState, lazy, Suspense, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Header from './Header'
import Loading from './Components/Loading'
import locate, { setLanguage, STORAGE_KEY, getItem } from './locate'
import { mainClass } from './styles'

const filterLang = href => (href.indexOf('/en') > -1 ? 'en-US' : 'zh-CN')

const App = () => {
  const [versions, setVersions] = useState([])
  const [lastPath] = useState({ pathname: history.location.pathname })
  const [, setUpdate] = useState()

  useEffect(() => {
    const lang = filterLang(window.location.href)
    setLanguage(lang)
    if (getItem(STORAGE_KEY) !== lang) {
      setUpdate('update')
    }

    const unListen = history.listen(loc => {
      if (lastPath.pathname !== loc.pathname) {
        document.documentElement.scrollTop = 0
        lastPath.pathname = loc.pathname
      }
    })

    fetch('../../../versions.json')
      .then(res => res.json())
      .then(json => {
        const language = locate('cn', 'en')
        const jsonVersions = json.map(v => ({
          content: v,
          url: '', // versionUrl(v, language)
        }))
        setVersions(jsonVersions)
      })
      .catch(() => {})

    return () => {
      unListen()
    }
  }, [])

  return (
    <Router history={history}>
      <div>
        <Header versions={versions} />
        <div className={mainClass('body')}>
          <Suspense fallback={<Loading />}>
            <Switch />
          </Suspense>
        </div>
      </div>
    </Router>
  )
}

export default App
