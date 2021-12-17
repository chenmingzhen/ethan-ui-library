import { PureComponent } from '@/utils/component'
import React from 'react'
import immer from 'immer'
import Context, { AddItem } from './context'
import PhotoSlider from './PhotoSlider'
import { PhotoViewImageData, PhotoViewGroupBase } from './types'

export interface PhotoViewGroupProps extends PhotoViewGroupBase {
    children: React.ReactNode
}

interface PhotoViewGroupState {
    images: PhotoViewImageData[]

    visible: boolean

    index: number
}

/**
 * 装载图片组的容器 处理点击图片组内容时的动作 如打开Slider 增加Item 溢移除Item
 */
export default class PhotoViewGroup extends PureComponent<PhotoViewGroupProps, PhotoViewGroupState> {
    constructor(props) {
        super(props)

        this.state = {
            // 图片Arr
            images: [],
            // 当前是否可见
            visible: false,
            // 当前选中的Image 用于打开Slider
            index: 0,
        }
    }

    handleAddItem: AddItem = imageItem => {
        this.setState(
            immer(state => {
                state.images.push(imageItem)
            })
        )
    }

    handleRemoveItem = (key: string) => {
        this.setState(({ images, index }) => {
            const nextImages = images.filter(item => item.key !== key)
            const nextEndIndex = nextImages.length - 1

            return {
                images: nextImages,
                index: Math.min(nextEndIndex, index),
            }
        })
    }

    handleShow = (key: string) => {
        const { images } = this.state

        this.setState({
            visible: true,
            index: images.findIndex(item => item.key === key),
        })
    }

    handleClose = () => {
        this.setState({
            visible: false,
        })
    }

    handleIndexChange = (index: number) => {
        this.setState({
            index,
        })
    }

    render() {
        const { children, ...restProps } = this.props
        const { images, visible, index } = this.state

        return (
            <Context.Provider
                value={{
                    ...this.state,
                    addItem: this.handleAddItem,
                    removeItem: this.handleRemoveItem,
                    onShow: this.handleShow,
                }}
            >
                {children}
                <PhotoSlider
                    images={images}
                    visible={visible}
                    index={index}
                    onIndexChange={this.handleIndexChange}
                    onClose={this.handleClose}
                    {...restProps}
                />
            </Context.Provider>
        )
    }
}
