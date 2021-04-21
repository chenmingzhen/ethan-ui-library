// @ts-nocheck 
import config from '@/config'
import cssAccessor from '@/utils/css-accessors'
import icons from './index'

let cachedCaret
const caretMap = {
  line: icons.CaretLine,
  fill: icons.CaretFill,
}

// 符号 eg:向下符号
export default () => {
  if (config.caret) return caretMap[config.caret]
  if (cachedCaret) return cachedCaret
  // fill
  cachedCaret = caretMap[cssAccessor.common.caret]
  return cachedCaret || icons.CaretFill
}
