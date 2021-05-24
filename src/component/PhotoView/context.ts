import { createContext } from 'react'
import { DataType } from './types'

export type OnShow = (key?: string) => void

export type AddItem = ({ key, src, originRef, intro }: DataType) => void

export type RemoveItem = (key?: string) => void

export interface PhotoContext {
    onShow: OnShow

    addItem: AddItem

    removeItem: RemoveItem
}

export default createContext<PhotoContext>({ onShow() {}, addItem() {}, removeItem() {} })
