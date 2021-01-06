import React from 'react'
import Control from '@/component/Menu/example/Control'
import CustomRender from '@/component/Menu/example/CustomRender'
import Click from '@/component/Menu/example/Click'
import Dark from '@/component/Menu/example/Dark'
import Base from './Base'
import Link from './Link'
import Layout from './Layout'
import Vertical from './Vertical'
import Disabled from './Disabled'

export default () => (
  <>
    <Base />
    <Link />
    <Layout />
    <Vertical />
    <Disabled />
    <Control />
    <CustomRender />
    <Click />
    <Dark />
  </>
)
