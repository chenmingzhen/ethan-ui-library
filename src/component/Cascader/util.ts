import { parsePxToNumber } from '@/utils/strings'

interface GerResetMoreParams {
    fixWidth: number

    container: HTMLElement

    doms: NodeListOf<HTMLElement>
}

export function getResetMore({ fixWidth, container, doms }: GerResetMoreParams) {
    if (!container || !doms?.length) return -1

    const items = Array.from(doms)

    const containerStyle = getComputedStyle(container)

    const { clientWidth } = container

    const paddingLeft = parsePxToNumber(containerStyle.paddingLeft)

    const paddingRight = parsePxToNumber(containerStyle.paddingRight)

    const contentWidth = clientWidth - paddingLeft - paddingRight - fixWidth

    const moreElement = items.pop()

    const moreElementStyle = getComputedStyle(moreElement)

    const moreElementMargin =
        parsePxToNumber(moreElementStyle.marginLeft) + parsePxToNumber(moreElementStyle.marginRight)

    let showNum = 0

    let sumWidth = 0

    const itemWidthList = items.map((item) => {
        const itemStyle = getComputedStyle(item)

        const itemWidth =
            item.offsetWidth + parsePxToNumber(itemStyle.marginLeft) + parsePxToNumber(itemStyle.marginRight)

        sumWidth += itemWidth

        return itemWidth
    })

    if (sumWidth > contentWidth) {
        let totalWidth = 0

        for (let i = 0; i < itemWidthList.length; i++) {
            totalWidth += itemWidthList[i]

            const reset = `+${items.length - 1 - i}`
            ;(moreElement.childNodes[0] as HTMLElement).innerText = reset

            const moreWidth = moreElement.offsetWidth + moreElementMargin

            if (totalWidth > contentWidth - moreWidth) {
                break
            }

            showNum += 1

            if (i === items.length - 1) {
                showNum = -1
            }
        }
    } else {
        showNum = -1
    }

    return showNum
}
