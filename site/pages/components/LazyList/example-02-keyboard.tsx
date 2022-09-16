/**
 * cn -  键盘滚动容器
 *    -- 添加keyboardControl prop可以使用键盘进行滚动
 * en - Keyboard scroll
 *    -- Add keyboardControl prop to scroll using the keyboard
 */
import React from 'react'
import { LazyList, Alert } from 'ethan'
import { range } from '@/utils/numbers'

const dataSource = range(50000)

export default () => {
    return (
        <LazyList
            height={300}
            data={dataSource}
            defaultIndex={49999}
            lineHeight={43}
            keyboardControl
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
