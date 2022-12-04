import ProImage from './ProImage'
import ProImageGroup from './ProImageGroup'
import { ProImageProps } from './type'

interface ProImageComponent extends React.ComponentClass<ProImageProps> {
    Group: typeof ProImageGroup
}

const ComputedProImage = ProImage as unknown as ProImageComponent

ComputedProImage.Group = ProImageGroup

export default ComputedProImage
