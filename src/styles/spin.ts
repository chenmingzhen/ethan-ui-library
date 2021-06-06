import genaration from '@/utils/classnames'

import * as defaultLess from './spin/default.less'
import * as ringLess from './spin/ring.less'
import * as planeLess from './spin/plane.less'
import * as pulseLess from './spin/pulse.less'
import * as waveLess from './spin/wave.less'
import * as chasingDotsLess from './spin/chasing-dots.less'
import * as doubleBounceLess from './spin/double-bounce.less'
import * as cubeGridLess from './spin/cube-grid.less'
import * as chasingRingLess from './spin/chasing-ring.less'
import * as scaleCircleLess from './spin/scale-circle.less'
import * as threeBounceLess from './spin/three-bounce.less'
import * as fourDotsLess from './spin/four-dots.less'

export const defaultClass = genaration(defaultLess, 'spin-default')
export const ringClass = genaration(ringLess, 'spin-ring')
export const planeClass = genaration(planeLess, 'spin-plane')
export const pulseClass = genaration(pulseLess, 'spin-pulse')
export const waveClass = genaration(waveLess, 'spin-wave')
export const chasingDotsClass = genaration(chasingDotsLess, 'chasing-dots')
export const doubleBounceClass = genaration(doubleBounceLess, 'double-bounce')
export const cubeGridClass = genaration(cubeGridLess, 'cube-grid')
export const chasingRingClass = genaration(chasingRingLess, 'chasing-ring')
export const scaleCircleClass = genaration(scaleCircleLess, 'scale-circle')
export const threeBounceClass = genaration(threeBounceLess, 'three-bounce')
export const fourDotsClass = genaration(fourDotsLess, 'four-dots')
