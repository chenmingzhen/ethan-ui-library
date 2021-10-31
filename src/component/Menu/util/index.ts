interface GetOptionReturn {
    key: 'height' | 'width'
    pos: 'Top' | 'Left'
    direction: 'Y' | 'X'
}

export function getOption(mode): GetOptionReturn {
    return mode.indexOf('vertical') === 0 || mode === 'inline'
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
