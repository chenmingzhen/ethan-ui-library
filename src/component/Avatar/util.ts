const fitText = (containerNode, textNode) => {
    if (!containerNode || !textNode) {
        return 1
    }

    // When using with transforms, getBoundingClientRect().width and offsetWidth
    // returns different results.
    // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
    const containerWidth = containerNode.getBoundingClientRect().width
    const textWidth = textNode.offsetWidth

    // Leave some space
    const visualWidth = containerWidth - 6

    if (visualWidth > textWidth) {
        return 1
    }

    return visualWidth / textWidth
}

export default fitText
