class EventBus<EventMap extends { [key in string]: any }> {
    private listeners: { [key in keyof EventMap]?: any } = {}

    constructor() {
        this.addEventListener = this.addEventListener.bind(this)
        this.removeEventListener = this.removeEventListener.bind(this)
        this.dispatchEvent = this.dispatchEvent.bind(this)
        this.internalDispatchEvent = this.internalDispatchEvent.bind(this)
    }

    addEventListener<K extends keyof EventMap>(type: K, callback: (evt: CustomEvent<EventMap[K]>) => void) {
        if (!(type in this.listeners)) {
            this.listeners[type] = []
        }

        this.listeners[type].push(callback)
    }

    removeEventListener<K extends keyof EventMap>(type: K, callback: (evt: CustomEvent<EventMap[K]>) => void) {
        if (!(type in this.listeners)) {
            return
        }

        const stack = this.listeners[type]

        for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1)

                return
            }
        }
    }

    /** @description 原生的CustomEvent的type类型推断不够完善，多加一层进行类型推断 */
    dispatchEvent<K extends keyof EventMap>(type: K, detail: EventMap[K]) {
        return this.internalDispatchEvent(new CustomEvent(type as string, { detail }))
    }

    private internalDispatchEvent<K extends keyof EventMap>(event: CustomEvent<EventMap[K]>) {
        if (!(event.type in this.listeners)) {
            return true
        }

        const stack = this.listeners[event.type].slice()

        for (let i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event)
        }

        return !event.defaultPrevented
    }
}

export default EventBus
