import React from 'react'

interface HighlightProps {
    text: string
    highlightTexts?: string[] // 新的写法
    highlightClassName?: string
}

function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 转义特殊字符
}

const Highlight: React.FC<HighlightProps> = function (props) {
    const { text, highlightTexts, highlightClassName = 'error' } = props

    if (highlightTexts.length === 0) return <>{text}</>

    // 创建一个正则表达式来匹配所有的高亮文本
    const highlightRegex = new RegExp(highlightTexts.map(escapeRegExp).join('|'), 'ig')

    // 用正则表达式分割文本
    const highlightClip = text.split(highlightRegex)

    // 查找所有匹配的高亮文本
    const matches = text.match(highlightRegex)

    return (
        <>
            {highlightClip.map((t, index) => {
                if (index === highlightClip.length - 1) {
                    return <React.Fragment key={index}>{t}</React.Fragment>
                }

                return (
                    <React.Fragment key={index}>
                        {t}
                        {matches && matches[index] && (
                            <span className={highlightClassName} style={{ color: '#FF4E50' }}>
                                {matches[index]}
                            </span>
                        )}
                    </React.Fragment>
                )
            })}
        </>
    )
}

export default React.memo(Highlight)
