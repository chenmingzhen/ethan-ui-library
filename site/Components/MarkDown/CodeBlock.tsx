import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import { exampleClass } from 'doc/styles'

interface CodeBlockProps {
    /** md文件中代码块注明的语言类型 */
    language?: string
    value: string
}

const CodeBlock: React.FC<CodeBlockProps> = (props) => {
    const { language = 'lang-jsx', value } = props

    const elRef = useRef<HTMLPreElement>(null)

    useEffect(() => {
        Prism.highlightElement(elRef.current, false)
    }, [])

    return (
        <pre ref={elRef} className={classnames(language, exampleClass('pre'))}>
            <code>{value}</code>
        </pre>
    )
}

export default CodeBlock
