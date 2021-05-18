import { MemoExoticComponent, ForwardRefExoticComponent } from 'react'
import Image, { ImageProps } from './Image'
import Group from './Group'

interface ImageComponent extends MemoExoticComponent<ForwardRefExoticComponent<ImageProps>> {
    Group: typeof Group
}

;(Image as ImageComponent).Group = Group

export default Image
