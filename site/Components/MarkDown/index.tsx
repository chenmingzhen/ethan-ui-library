import React, { useContext } from 'react'
import ReactMarkDown from 'react-markdown'
import { Link } from 'react-router-dom'
import { markdownClass } from 'doc/styles'
import locate from '../../utils/locate'
import CodeBlock from './CodeBlock'
import Example from '../Example'
import Table from './Table'
import NavigationContext from '../Navigation/context'

interface MarkdownProps {
    source: string
    examples
}

function createId(level: number, str: string) {
    return `${level}-${(str || '').replace(/[\W|-]/g, '-')}`
}

const Markdown: React.FC<MarkdownProps> = function (props) {
    const headings = []
    const { setHeadings } = useContext(NavigationContext)
    const { source, examples } = props

    React.useEffect(() => {
        setHeadings(headings)
    }, [])

    const renderExamples = () => {
        if (!examples) return <div />

        const text = locate('示例', 'Example')
        const id = 'heading-example-h'

        headings.push({
            id,
            level: 2,
            children: [text],
        })

        const examplesComponents = [
            <h2 key="h" id={id}>
                {text}
            </h2>,
            ...examples.map((prop) => {
                const sid = `heading-${prop.name}`
                const [title] = prop.title.split('\n')

                headings.push({
                    id: sid,
                    level: 3,
                    children: [title],
                })

                return <Example key={sid} id={sid} {...prop} />
            }),
        ]

        return examplesComponents
    }

    const renderHeading = ({ level, children }) => {
        const Tag = `h${level}` as keyof Pick<HTMLElementTagNameMap, 'h1' | 'h2' | 'h3'>
        const id = `heading-${createId(level, children[0])}`

        if (level === 2 || level === 3) {
            headings.push({ id, level, children })
        }

        return <Tag id={id}>{children}</Tag>
    }

    return (
        <ReactMarkDown
            className={markdownClass('_')}
            source={source}
            renderers={{
                code: CodeBlock,
                heading: renderHeading,
                table: Table,
                html: (prop) => {
                    if (prop.value === '<example />') return <>{renderExamples()}</>
                    if (prop.value === '<br>' || prop.value === '<br />') return <br />

                    return null
                },
                link: (prop) => {
                    const target = prop.href.indexOf('http') === 0 ? '_blank' : undefined

                    return target ? (
                        <a href={prop.href} target={target}>
                            {prop.children}
                        </a>
                    ) : (
                        <Link to={prop.href}>{prop.children}</Link>
                    )
                },
            }}
        />
    )
}

export default React.memo(Markdown)
