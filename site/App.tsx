import React, { useState, lazy, Suspense, useEffect } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { useUpdate } from 'react-use'
import history from 'docs/history'
import Header from 'docs/Header'
import Loading from './Components/Loading'
import { setLanguage, STORAGE_KEY, getItem } from './utils/locate'
import { mainClass } from './styles'

const filterLang = href => (href.indexOf('/en') > -1 ? 'en-US' : 'zh-CN')

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'))
const Components = lazy(() => import(/* webpackChunkName: "Components" */ './chunks/Components'))

const App = () => {
    const [currentPath, updateCurrentPath] = useState(history.location.pathname)

    const update = useUpdate()

    useEffect(() => {
        const lang = filterLang(window.location.href)

        setLanguage(lang)

        if (getItem(STORAGE_KEY) !== lang) {
            update()
        }

        const unListen = history.listen(({ pathname }) => {
            if (currentPath.pathname !== pathname) {
                document.documentElement.scrollTop = 0

                updateCurrentPath(pathname)
            }
        })

        return () => {
            unListen()
        }
    }, [])

    return (
        <Router history={history}>
            <div>
                <Header />
                <div className={mainClass('body')}>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route exact path="/index" component={Home} />
                            <Route path="/components" component={Components} />
                        </Switch>
                    </Suspense>
                </div>
            </div>
        </Router>
    )
}

export default App
