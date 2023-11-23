import { useLocation } from 'react-router-dom'
import { RecursiveMenuWithExtraData } from '@/component/Menu/type'

export interface NavMenuData {
    path: string
    cn: string
    en: string
}

const navs: RecursiveMenuWithExtraData<NavMenuData>[] = [
    { path: '/index/', en: 'Home', cn: '首页', key: '/index/' },
    { path: '/components/Start', en: 'Components', cn: '组件', key: '/components/Start' },
]

const useNav = () => {
    const location = useLocation()

    const initPath = location.pathname.indexOf('/index/') !== -1 ? navs[0].key : navs[1].key

    return { initPath, navs }
}

export default useNav
