import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import history from '../Components/history'

const navs = [
  { path: '/index/', en: 'Home', cn: '首页' },
  { path: '/components/Start', en: 'Components', cn: '组件' },
]

const useNav = () => {
  const [currentPath, setPath] = useState(navs[0].path)

  const location = useLocation()

  useEffect(() => {
    setPath(location.pathname.indexOf('/index/') !== -1 ? navs[0].path : navs[1].path)

    const unListen = history.listen(loc => {
      setPath(loc.pathname.indexOf('/index/') !== -1 ? navs[0].path : navs[1].path)
    })

    return () => {
      unListen()
    }
  }, [])

  return [currentPath, navs]
}

export default useNav
