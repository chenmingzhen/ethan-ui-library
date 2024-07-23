/**
 * cn -
 *    -- columns 为 -1 时选项会堆叠展示， columnWidth 为选项框的宽度
 * en -
 *    -- Set columns -1, options will display end by end， columnsWidth is the width of the option box
 */
import React from 'react'
import { Select } from 'ethan-ui'
import { fetchSync as fetchCity } from 'doc/data/city'

const cities = fetchCity(200)

export default function () {
    return (
        <Select
            data={cities}
            valueKey="id"
            columns={-1}
            columnWidth={500}
            multiple
            placeholder="Select citys"
            labelKey="city"
            onFilter={(text, d) => d.city.toLowerCase().indexOf(text.toLowerCase()) >= 0}
        />
    )
}
