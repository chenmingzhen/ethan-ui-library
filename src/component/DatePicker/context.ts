import { createContext } from 'react'
import { RangePickerContextProps } from './type'

/** RangePicker相关的Props统一使用Context读取 */
const RangePickerContext = createContext<RangePickerContextProps>(undefined)

export default RangePickerContext
