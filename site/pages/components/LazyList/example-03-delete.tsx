/**
 * cn -  可变的数据源
 *    -- LazyList可随着数据源的变化而变化
 * en - Variable data source
 *    -- LazyList can change as dataSource changes
 */
import React from 'react'
import { LazyList, Alert } from 'ethan-ui'
import { range } from '@/utils/numbers'

const ALERT_ANIMATION_DURATION = 216

export default () => {
    const [dataSource, updateDataSource] = React.useState(range(10))

    function handleClose(index: number) {
        setTimeout(() => {
            updateDataSource(prev => {
                prev.splice(index, 1)

                return [...prev]
            })
        }, ALERT_ANIMATION_DURATION)
    }

    return (
        <LazyList
            height={300}
            data={dataSource}
            lineHeight={43}
            renderItem={(data, index) => {
                return (
                    <Alert
                        type={data % 2 === 0 ? 'info' : 'success'}
                        key={data}
                        style={{ margin: '5px 0' }}
                        onClose={handleClose.bind(this, index)}
                    >
                        {data}
                    </Alert>
                )
            }}
        />
    )
}
