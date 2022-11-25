export interface LazyParams {
    offset?: number
    container?: HTMLElement
    target: HTMLElement
    render(): void
}

export function lazyLoad(params: LazyParams) {
    const { container = document, offset = 0, render, target } = params

    /** @see http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html  */
    if (!window.IntersectionObserver) {
        render()

        return () => {}
    }

    let watching = true

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // 正在视图层 可以渲染处理
                if (entry.isIntersecting) {
                    render()

                    dispose()
                }
            })
        },
        { root: container, rootMargin: `${offset}px` }
    )

    observer.observe(target)

    const dispose = () => {
        if (!watching) return

        observer.disconnect()

        watching = false
    }

    return dispose
}
