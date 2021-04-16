/**
 * cn - 可输入
 *    -- 设置 inputable 使日期可输入 如果输入与format不一致的值会被清除
 * en - Inputable
 *    -- Set inputable to true, you can change the value by input,If you enter a value that is not consistent with format, it will be
 */
import React from 'react'
import { DatePicker } from 'ethan/index'

export default function() {
  return (
    <div>
      <DatePicker placeholder="Input date" inputable style={{ marginRight: 12 }} />

      <DatePicker type="datetime" inputable defaultValue={new Date()} />

      <br />

      <DatePicker range inputable defaultValue={[Date.now() - 864000000, new Date()]} style={{ marginTop: 12 }} />
    </div>
  )
}
