/**
 * cn -  基本用法
 *    -- 基本用法
 * en - Base
 *    -- Base
 */
import React from 'react'
import { LazyList, Alert } from 'ethan-ui'
import { range } from '@/utils/numbers'

const dataSource = range(50000)

export default () => {
    return (
        <LazyList
            height={300}
            data={dataSource}
            lineHeight={43}
            renderItem={data => {
                return (
                    <Alert type={data % 2 === 0 ? 'info' : 'success'} key={data} style={{ margin: '5px 0' }}>
                        {data}
                    </Alert>
                )
            }}
        />
    )
}
