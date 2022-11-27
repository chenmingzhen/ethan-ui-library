import React, { Children, cloneElement, ReactElement } from 'react'
import { imageClass } from '@/styles'
import { showGallery } from './events'
import { GroupProps, ImageItem } from './type'

const Group: React.FC<GroupProps> = ({ pile, children, style, ...props }) => {
    const handleClick = (index) => {
        const images: ImageItem[] = []

        let current = 0

        Children.toArray(children).forEach((child: any, i) => {
            if (child?.type?.IS_ETHAN_IMAGE) {
                if (index === i) current = images.length

                const { src, href } = child.props

                images.push({ src: href || src, key: i })
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
