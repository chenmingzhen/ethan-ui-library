import { ColorPercent, ColorRange } from './type'

const analyzeColor = (color: ColorRange | ColorPercent) => {
    if ((<ColorRange>color).from) {
        return [
            { pos: '0%', color: (<ColorRange>color).from },
            { pos: '100%', color: (<ColorRange>color).to },
        ]
    }

    return Object.keys(color)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
        .reduce((p, v) => {
            p.push({ pos: v, color: color[v] })
            return p
        }, [])
}

export default analyzeColor
