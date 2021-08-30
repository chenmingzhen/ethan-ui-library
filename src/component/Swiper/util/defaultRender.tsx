import { SwiperProps } from '../type'

export const defaultRenderPrevArrow: SwiperProps['renderPrevArrow'] = onPrev => {
    return (
        <div className="zent-swiper__arrow zent-swiper__arrow-left" onClick={onPrev}>
            {/* <Icon type="right-circle" className="zent-swiper__arrow-icon" /> */}
        </div>
    )
}

export const defaultRenderNextArrow: SwiperProps['renderNextArrow'] = onNext => {
    return (
        <div className="zent-swiper__arrow zent-swiper__arrow-right" onClick={onNext}>
            {/* <Icon type="right-circle" className="zent-swiper__arrow-icon" /> */}
        </div>
    )
}
