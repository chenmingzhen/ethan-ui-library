const fitText = (containerNode, textNode) => {
    if (!containerNode || !textNode) {
        return 1
    }

    const containerWidth = containerNode.getBoundingClientRect().width
    const textWidth = textNode.offsetWidth

    const visualWidth = containerWidth - 6

    if (visualWidth > textWidth) {
        return 1
    }

    return visualWidth / textWidth
}

export default fitText
