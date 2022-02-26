import { ColorPercent, ColorRange } from './type'

const analyzeColor = (color: ColorRange | ColorPercent) => {
    if ((<ColorRange>color).from) {
        return [
            { pos: '0%', color: (<ColorRange>color).from },
            { pos: '100%', color: (<ColorRange>color).to },
        ]
    }

    return Object.keys(color)
        .sort((prev, next) => parseInt(prev, 10) - parseInt(next, 10))
        .reduce((accumulatedValue, currentValue) => {
            accumulatedValue.push({ pos: currentValue, color: color[currentValue] })

            return accumulatedValue
        }, [])
}

export default analyzeColor
