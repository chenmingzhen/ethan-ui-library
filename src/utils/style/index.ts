/** 暴露api */
import cssAccessors from './css-accessors'
import { capitalize } from '../strings'
import { entries } from '../objects'

function setStyle(options) {
    if (!options) {
        Object.keys(cssAccessors).forEach((module) => {
            const setter = `set${capitalize(module)}`
            cssAccessors[module][setter](
                Object.keys(cssAccessors[module]).reduce((obj, key) => {
                    obj[key] = undefined
                    return obj
                }, {})
            )
        })

        return
    }

    for (const [key, values] of entries(options)) {
        const setterName = `set${capitalize(key)}`
        if (cssAccessors[key] && cssAccessors[key][setterName]) cssAccessors[key][setterName](values)
    }
}

const style = {
    setStyle,
}

export { style }
