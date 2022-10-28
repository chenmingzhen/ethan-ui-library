import { ColorPickerProps } from './type'

export function getDefaultColor(format: ColorPickerProps['format']) {
    if (format === 'hex') {
        return '#ff0000'
    }

    if (format === 'hsla') {
        return 'hsl(0,100%,50%)'
    }

    return 'rgb(255,0,0)'
}
