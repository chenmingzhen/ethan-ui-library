/**
 * cn -  动态加载
 *    -- 滚动到底部加载数据
 * en - Dynamically Loaded
 *    -- Scroll to the bottom to load the data
 */
import React, { useEffect, useState } from 'react'
import { LazyList, Alert, Spin } from 'ethan-ui'
import { range } from '@/utils/numbers'

export default () => {
    const [length, updateLength] = useState(10)

    const [dataSource, updateDataSource] = useState(range(length))

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        updateDataSource(range(length))
    }, [length])

    return (
        <Spin loading={loading}>
            <LazyList
                height={300}
                data={dataSource}
                lineHeight={43}
                onScrollStateChange={({ scrollTopRatio }) => {
                    console.log('scrollTopRatio:', scrollTopRatio)

                    if (scrollTopRatio === 1) {
                        setLoading(true)

                        setTimeout(() => {
                            setLoading(false)

                            updateLength(length + 10)
                        }, 2000)
                    }
                }}
                renderItem={data => {
                    return (
                        <Alert icon type={data % 2 === 0 ? 'info' : 'success'} key={data} style={{ margin: '5px 0' }}>
                            {data}
                        </Alert>
                    )
                }}
            />
        </Spin>
    )
}
