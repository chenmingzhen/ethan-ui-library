import { createBrowserHistory as createHistory } from 'history'
import getBasePath from '../utils/basepath'

// 新的路由形式 basename是基地址 /cn或者/en
export default createHistory({ basename: getBasePath() })
