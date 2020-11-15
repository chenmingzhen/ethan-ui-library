import { createBrowserHistory as createHistory } from 'history'
import getBasePath from './utils/basepath'

export default createHistory({ basename: getBasePath() })
