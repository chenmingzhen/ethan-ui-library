/**
 * cn - 自定义
 *    -- 自定义加载风格和加载进度
 * en - Customize
 *    -- Customize the loading style and loading schedule
 */

import React from 'react'
import { Loading, Button } from 'ethan-ui'

export default () => {
    React.useEffect(() => Loading.clear, [])

    return (
        <div>
            <Button
                onClick={() => {
                    Loading.config({
                        color: '#dc3545',
                        height: 5,
                    })
                }}
            >
                customize
            </Button>
            <Button onClick={() => Loading.upload(30)}>upload(30)</Button>
            <Button onClick={() => Loading.upload(80)}>upload(80)</Button>
        </div>
    )
}
