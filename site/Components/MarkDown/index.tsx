import React from 'react'
import ReactMarkDown from 'react-markdown'
import { Link } from 'react-router-dom'
import { getUidStr } from '@/utils/uid'
import { markdownClass } from 'doc/styles'
import { Heading } from 'doc/type'
import locate from '../../utils/locate'
import CodeBlock from '../CodeBlock'
import Example from '../Example'
import Table from '../Table'

interface MarkdownProps {
    onHeadingSet(headings: Heading[]): void

    source

    examples
}

const exampleReg = /^<example name="([\w|-]+)"/

const createId = (level, str) => {
    if (level === 4) return getUidStr()
    return `${level}-${(str || '').replace(/[\W|-]/g, '-')}`
}

function MarkDown({ onHeadingSet, examples, source }: MarkdownProps) {
    const headings = React.useRef<Heading[]>([]).current

    React.useEffect(() => {
        onHeadingSet?.(headings)
    }, [])

    const appendHeading = (heading) => {
        headings.push(heading)
    }

    const renderExamples = () => {
        if (!examples) return <div />

        const text = locate('示例', 'Example')

        const id = 'heading-example-h'

        appendHeading({
            id,
            level: 2,
            children: [text],
        })

        const examplesComponents = [
            <h2 key="h" id={id}>
                {text}
            </h2>,
            ...examples.map((prop, i) => {
                if (/\d+-/.test(prop.name)) {
                    const sid = `heading-${prop.name}`

                    const [title] = prop.title.split('\n')

                    appendHeading({
                        id: sid,
                        level: 3,
                        children: [title],
                    })

                    return <Example key={i} id={sid} {...prop} />
                }
                return undefined
            }),
        ]

        return examplesComponents
    }

    const renderExample = (name) => {
        const example = (examples || []).find((e) => e.name === name)

        if (!example) return null

        return <Example {...example} />
    }

    const renderHeading = ({ level, children }) => {
        const Tag = `h${level}` as 'h1' | 'h2' | 'h3'

        const id = `heading-${createId(level, children[0])}`

        if (level === 2 || level === 3) {
            appendHeading({ id, level, children })
        }

        return <Tag id={id}>{children}</Tag>
    }

    return (
        <ReactMarkDown
            className={markdownClass('_')}
            // markdown 通过source来切换中英状态
            source={source}
            // 对应pages/components/XXX/xx.md的格式
            // 根据内容渲染
            renderers={{
                // markdown code 渲染方式
                code: CodeBlock,
                // markdown header 渲染方式
                heading: renderHeading,
                html: (prop) => {
                    if (prop.value === '<example />') return <>{renderExamples()}</>

                    const example = prop.value.match(exampleReg)

                    if (example) return <>{renderExample(example[1])}</>

                    if (prop.value === '<br>' || prop.value === '<br />') return <br />

                    return null
                },
                // markdown table 渲染方式
                table: Table,
                // markdown link 渲染方式
                link: (prop) => {
                    const target = prop.href.indexOf('http') === 0 ? '_blank' : undefined
                    if (target)
                        return (
                            <a href={prop.href} target={target}>
                                {prop.children}
                            </a>
                        )
                    return (
                        <Link to={prop.href} target={target}>
                            {prop.children}
                        </Link>
                    )
                },
            }}
        />
    )
}

export default React.memo(MarkDown)
