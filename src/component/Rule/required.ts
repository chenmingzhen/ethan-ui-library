import { deepMerge } from '@/utils/objects'
import { substitute } from '@/utils/strings'
import { getLocale } from '@/locale'

const options = { skipUndefined: true }

export const requiredMessage = props => {
  const type = props.type === 'array' ? 'array' : 'string'
  // 如果props为空 则使用内置的requiredMessage 文案
  return substitute(getLocale(`rules.required.${type}`), props)
}

export default ({ message, tip } = {}) => msg =>
  deepMerge(
    {
      required: true,
      message: requiredMessage,
    },
    deepMerge({ message, tip }, { message: msg }, options),
    options
  )
