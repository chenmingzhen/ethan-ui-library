import Image from './Image'
import Group from './Group'
import { ImageProps } from './type'

interface ImageComponent extends React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLDivElement>> {
    Group: typeof Group
    IS_ETHAN_IMAGE: boolean
}

const ComputedImage = Image as unknown as ImageComponent

ComputedImage.Group = Group
ComputedImage.IS_ETHAN_IMAGE = true

export default ComputedImage
