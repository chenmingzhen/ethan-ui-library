import { capitalize } from '../strings'
import { entries } from '../objects'
import cssInject from './vars-inject'
import { runInNextFrame } from '../nextFrame'

const accessors: Record<string, Record<string, any>> = {
    tag: {},
    pagination: {},
    button: {},
    color: {},
    tooltip: {},
    input: {},
    select: {},
    datepicker: {},
    slider: {},
    menu: {},
    form: {},
    checkbox: {},
    radio: {},
    alert: {},
    message: {},
    card: {},
    modal: {},
    popover: {},
    tree: {},
    dropdown: {},
    common: {},
    switch: {},
}

function getDOMStyle(dom) {
    document.body.appendChild(dom)

    const style = window.getComputedStyle(dom)

    runInNextFrame(() => {
        dom.parentElement.removeChild(dom)
    })

    return style
}

function getStyleAttr(className, key = 'color') {
    const div = document.createElement('div')

    div.className = className

    const value = getDOMStyle(div)[key]

    return value
}

function setOptions(options, setter) {
    if (!options) return

    for (const [key, value] of entries(options)) {
        if (key === setter) continue

        this[key] = value
    }
}

for (const [componentName, componentModule] of entries(accessors)) {
    const setterName = `set${capitalize(componentName)}`

    componentModule[setterName] = (options) => setOptions.call(componentModule, options, setterName)

    cssInject[componentName].conf.forEach((item) => {
        const { name, className, attr, parser = (v) => v } = item

        Object.defineProperty(componentModule, name, {
            enumerable: true,
            get: () => {
                if (item.value) return item.value

                const res = getStyleAttr(className, attr)

                return parser(res)
            },
            set: (v) => {
                if (item.value) item.value = v

                cssInject[componentName][name] = v
            },
        })
    })
}

export default accessors
