import DatePicker from './DatePicker'
import RangePicker from './RangePicker'

type DatePickerComponent = typeof DatePicker & { RangePicker: typeof RangePicker }

const Component = DatePicker as DatePickerComponent

Component.RangePicker = RangePicker

export default Component
