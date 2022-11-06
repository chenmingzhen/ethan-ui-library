import ColorPicker from './ColorPicker'
import ColorBoard from './ColorBoard'
import { ColorPickerProps } from './type'

export interface ColorPickerComponent extends React.ClassicComponentClass<ColorPickerProps> {
    ColorBoard: typeof ColorBoard
}

const MixinComponent: ColorPickerComponent = ColorPicker as unknown as ColorPickerComponent

MixinComponent.ColorBoard = ColorBoard

export default MixinComponent
