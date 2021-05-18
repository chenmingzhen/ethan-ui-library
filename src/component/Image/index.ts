import { MemoExoticComponent } from 'react'
import Image, { ImageProps } from './Image'
import Group from './Group'

interface ImageComponent extends MemoExoticComponent<React.FC<ImageProps>> {
    Group: typeof Group

    IS_ETHAN_IMAGE: boolean
}

;(Image as ImageComponent).Group = Group
;(Image as ImageComponent).IS_ETHAN_IMAGE = true

export default Image as ImageComponent
