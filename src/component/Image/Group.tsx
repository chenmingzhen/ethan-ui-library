import React, { Children, cloneElement, ReactElement } from 'react'
import { imageClass } from '@/styles'
import showGallery from './events'

interface GroupProps {
    /**
     * 是否堆叠
     */
    pile?: boolean
    /**
     * 是否懒加载
     */
    lazy?: boolean
    /**
     * 单个图片高度(值为百分比时，对比值为图片宽度)
     */
    height?: number | string
    /**
     * 单个图片宽度
     */
    width?: number | string
    /**
     * 图片打开方式
     */
    target?: '_modal' | '_blank' | '_self' | '_download'

    style?: React.CSSProperties
}

const Group: React.FC<GroupProps> = ({ pile, children, style, ...props }) => {
    const handleClick = (index) => {
        const images = []

        let current = 0

        Children.toArray(children).forEach((child: any, i) => {
            if (child?.type?.IS_ETHAN_IMAGE) {
                if (index === i) current = images.length

                const { src, href } = child.props

                images.push({ thumb: src, src: href || src, key: i })
            }
        })

        showGallery(images, current)
    }

    return (
        <div className={imageClass('group', pile && 'pile')} style={style}>
            {Children.toArray(children).map((child: ReactElement, i) =>
                cloneElement(child, {
                    ...props,
                    onClick: handleClick.bind(null, i),
                })
            )}
        </div>
    )
}

Group.displayName = 'EthanImageGroup'

export default Group
