import ProImage from './ProImage'
import ProImageGroup from './ProImageGroup'
import ProImageSlider from './ProImageSlider'
import { ProImageProps } from './type'

interface ProImageComponent extends React.ComponentClass<ProImageProps> {
    Group: typeof ProImageGroup
    Slider: typeof ProImageSlider
}

const ComputedProImage = ProImage as unknown as ProImageComponent

ComputedProImage.Group = ProImageGroup
ComputedProImage.Slider = ProImageSlider

export default ComputedProImage
