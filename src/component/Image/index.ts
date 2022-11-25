import { MemoExoticComponent, ForwardRefExoticComponent } from 'react'
import Image from './Image'
import Group from './Group'
import { ImageProps } from './type'

interface ImageComponent extends MemoExoticComponent<ForwardRefExoticComponent<ImageProps>> {
    Group: typeof Group
    IS_ETHAN_IMAGE: boolean
}

const ComputedImage = Image as ImageComponent

ComputedImage.Group = Group
ComputedImage.IS_ETHAN_IMAGE = true

export default ComputedImage
