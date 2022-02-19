/**
 * @see https://github.com/MinJieLiu/react-photo-view
 */

import PhotoViewGroup from './PhotoProvider'
import PhotoConsumer from './PhotoConsumer'
import PhotoSlider from './PhotoSlider'

export interface PhotoViewComponent {
    Photo: typeof PhotoConsumer

    PhotoSlider: typeof PhotoSlider

    Group: typeof PhotoViewGroup
}

const ComputedPhotoView = ({} as unknown) as PhotoViewComponent

ComputedPhotoView.Photo = PhotoConsumer

ComputedPhotoView.PhotoSlider = PhotoSlider

ComputedPhotoView.Group = PhotoViewGroup

export default ComputedPhotoView
