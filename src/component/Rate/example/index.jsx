import React from 'react'
import Base from './Base'
import Half from './Half'
import Color from './Color'
import ValueAndSize from './ValueAndSize'
import Text from './Text'
import Grade from './Grade'
import Repeat from './Repeat'
import Clear from './Clear'

export default () => (
  <>
    <div>
      <Base />
    </div>
    <div>
      <Half />
    </div>
    <div>
      <Color />
    </div>
    <div>
      <ValueAndSize />
    </div>
    <div>
      <Text />
    </div>
    <div>
      <Grade />
    </div>
    <div>
      <Repeat />
    </div>
    <div>
      <Clear />
    </div>
  </>
)
