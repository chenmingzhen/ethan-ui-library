import { createBrowserHistory } from 'history'

const reg = /(\/[c|e]n)/

const getBasePath = () => {
    const { pathname } = window.location
    const regExpExecArray = reg.exec(pathname) || { index: 0 }

    return pathname.substring(0, regExpExecArray.index + 3)
}

export default createBrowserHistory({ basename: getBasePath() })
