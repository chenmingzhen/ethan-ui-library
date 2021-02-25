/**
 * cn - 全局加载
 *    -- 整屏设置加载中，加载图案参考Spin的type
 * en - Global loading
 *    -- Full screen Settings are loaded,Load the pattern with reference to the type of Spin
 */

import React from 'react'
import { Loading, Button } from 'ethan/index'

export default () => {
  const useLoading = React.useCallback(type => {
    Loading.start(type, 'Loading')

    setTimeout(() => {
      Loading.finish()
    }, 2000)
  }, [])
  return (
    <div>
      <Button onClick={() => useLoading('wave')}>wave</Button>
      <Button onClick={() => useLoading('chasing-ring')}>chasing-ring</Button>
      <Button onClick={() => useLoading('plane')}>scale-circle</Button>
    </div>
  )
}
