import { SelectProps } from './type'

export function transformSizeToPx(size: SelectProps['size']) {
    switch (size) {
        case 'large':
            return 24
        case 'default':
            return 20
        case 'small':
            return 16

        default:
            return 20
    }
}
