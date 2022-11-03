import React, { createContext, memo, useCallback, useContext, useEffect } from 'react'

export type EventBusHandler<P = never> = (params: P) => void

export type EventBusHandlerList<T = unknown> = Array<EventBusHandler<T>>

export type EventBusHandlerMap<Events extends Record<string, unknown>> = Map<
    keyof Events,
    EventBusHandlerList<Events[keyof Events]>
>

export default function EventBus<Events extends Record<string, any>>(all?: EventBusHandlerMap<Events>) {
    type GenericEventHandler = EventBusHandler<Events[keyof Events]>

    all = all || new Map()

    const on = <Key extends keyof Events>(type: Key, handler: EventBusHandler<Events[Key]>) => {
        const handlers: Array<GenericEventHandler> = all.get(type)

        if (handlers) {
            handlers.push(handler)
        } else {
            all.set(type, [handler])
        }
    }

    const off = <Key extends keyof Events>(type: Key, handler?: GenericEventHandler) => {
        const handlers: Array<GenericEventHandler> = all.get(type)

        if (handlers) {
            if (handler) {
                const handlerIndex = handlers.indexOf(handler)

                if (handlerIndex > -1) {
                    handlers.splice(handlerIndex, 1)
                }
            } else {
                all.set(type, [])
            }
        }
    }

    const emit = <Key extends keyof Events>(type: Key, evt?: Events[Key]) => {
        const handlers = all.get(type)

        if (handlers) {
            handlers?.forEach((handler) => {
                handler(evt)
            })
        }
    }

    return {
        on,
        off,
        emit,
        all,
    }
}

export function createEventBusContainer<Events extends Record<string, any>>() {
    const Context = createContext<ReturnType<typeof EventBus<Events>>>(undefined)

    const Provider: React.FC = memo((props) => {
        const eventBus = EventBus<Events>()

        return <Context.Provider value={eventBus}>{props.children}</Context.Provider>
    })

    const useSubscribe = <Key extends keyof Events>(type: Key, handler: EventBusHandler<Events[Key]>) => {
        const callback = useCallback(handler, [handler])

        const eventBus = useContext(Context)

        useEffect(() => {
            eventBus.on(type, callback)

            return () => {
                eventBus.off(type, callback)
            }
        }, [callback])
    }

    const usePublish = () => {
        const eventBus = useContext(Context)

        const publish = useCallback(eventBus.emit, [])

        return publish
    }

    return { Provider, useSubscribe, usePublish }
}
