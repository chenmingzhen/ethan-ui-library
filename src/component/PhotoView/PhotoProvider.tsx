import React from 'react'
import Context, { AddItem } from './context'
import PhotoSlider from './PhotoSlider'
import { DataType, IPhotoProviderBase } from './types'

export interface PhotoProviderProps extends IPhotoProviderBase {
    children: React.ReactNode
}

type PhotoProviderState = {
    images: DataType[]
    visible: boolean
    index: number
}

export default class PhotoProvider extends React.Component<PhotoProviderProps, PhotoProviderState> {
    constructor(props) {
        super(props)

        this.state = {
            images: [],
            visible: false,
            index: 0,
        }
    }

    handleAddItem: AddItem = imageItem => {
        this.setState(prev => ({
            images: prev.images.concat(imageItem),
        }))
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
