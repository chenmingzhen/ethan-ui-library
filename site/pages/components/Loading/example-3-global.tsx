/**
 * cn - 全局加载
 *    -- 整屏设置加载中，加载图案参考Spin的type
 * en - Global loading
 *    -- Full screen Settings are loaded,Load the pattern with reference to the type of Spin
 */

import React from 'react'
import { Loading, Button } from 'ethan/index'

export default () => {
    const globalLoading = React.useCallback(type => {
        const { destroy } = Loading.fullScreen({ type, fallback: <span>loading...</span> })

        setTimeout(() => {
            destroy()
        }, 3000)
    }, [])
    return (
        <div>
            <Button onClick={() => globalLoading('wave')}>wave</Button>
            <Button onClick={() => globalLoading('chasing-ring')}>chasing-ring</Button>
            <Button onClick={() => globalLoading('plane')}>scale-circle</Button>
        </div>
    )
}
