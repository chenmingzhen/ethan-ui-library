import { createContext } from 'react'

export interface CardContext {
    // 折叠回调
    onCollapse(): void
    // 是否可折叠，'bottom' 表示从下方点击折叠
    collapsible: boolean | 'bottom'
    // 是否折叠
    collapsed: boolean

    formStatus: string

    onSubmit(target: EventTarget): void

    setFormStatus(status: string): void
}

export const context = createContext<CardContext>(null)

export const { Provider } = context
