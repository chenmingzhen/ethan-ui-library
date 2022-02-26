import { createContext } from 'react'
import { PhotoViewImageData } from './types'

export type OnShow = (key?: string) => void

export type AddItem = ({ key, src, originRef, intro }: PhotoViewImageData) => void

export type RemoveItem = (key?: string) => void

export interface PhotoContext {
    onShow: OnShow

    addItem: AddItem

    removeItem: RemoveItem
}

export default createContext<PhotoContext>({ onShow() { }, addItem() { }, removeItem() { } })
