import { useLocation } from 'react-router-dom'

const navMap = {
    '/index/': {
        en: 'Home',
        cn: '首页',
    },
    '/components/Start': {
        en: 'Components',
        cn: '组件',
    },
}

const navs = [{ key: '/index/' }, { key: '/components/Start' }]

const useNav = () => {
    const location = useLocation()

    const initPath = location.pathname.indexOf('/index/') !== -1 ? navs[0].key : navs[1].key

    return { initPath, navs, navMap }
}

export default useNav
