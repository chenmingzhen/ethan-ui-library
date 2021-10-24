interface GetOptionReturn {
    key: 'height' | 'width'
    pos: 'Top' | 'Left'
    direction: 'Y' | 'X'
}

export function getOption(mode): GetOptionReturn {
    return mode.indexOf('vertical') === 0
        ? {
            key: 'height',
            pos: 'Top',
            direction: 'Y',
        }
        : {
            key: 'width',
            pos: 'Left',
            direction: 'X',
        }
}

// Array To Map
export function keyToMap(keys = [], value = true) {
    const keyMap = new Map<string | number, boolean>()

    keys.forEach(v => {
        keyMap.set(v, value)
    })

    return keyMap
}
