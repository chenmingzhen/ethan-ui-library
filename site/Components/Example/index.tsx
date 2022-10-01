import React, { useState, useRef, createElement } from 'react'
import { Lazyload, Spin } from 'ethan-ui'
import Icon from 'doc/icons/Icon'
import { exampleClass } from 'doc/styles'
import AnimationHeight from '@/component/List/AnimationHeight'
import CodeBlock from '../CodeBlock'

interface ExampleProps {
    component: React.ComponentType

    id: string

    rawText: string

    title: string
}

const Example: React.FC<ExampleProps> = ({ component, id, rawText = '', title: propsTitle }) => {
    const [showCode, setShowCode] = useState(false)

    const ExampleComponent = useRef(createElement(component)).current

    // 正则去除文件非代码内容
    const text = rawText.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/, '').trim()

    const [title, ...sub] = propsTitle.split('\n')

    const toggleCode = () => {
        setShowCode(!showCode)
    }

    return (
        <>
            {title && <h3 id={id}>{title}</h3>}

            <Lazyload
                placeholder={
                    <div className={exampleClass('placeholder')}>
                        <Spin size="54px" name="four-dots" color="#53a0fd" />
                    </div>
                }
            >
                <div className={exampleClass('_', showCode && 'showcode')}>
                    <div className={exampleClass('body')}>{ExampleComponent}</div>

                    {propsTitle.length > 0 && (
                        <div className={exampleClass('desc')}>
                            {sub.map((s, i) => (
                                <div key={i} dangerouslySetInnerHTML={{ __html: s }} />
                            ))}

                            <a className={exampleClass('toggle')} onClick={toggleCode}>
                                <Icon name={showCode ? 'code-close' : 'code'} />
                            </a>
                        </div>
                    )}

                    <AnimationHeight
                        height={showCode ? 'auto' : 0}
                        easing="linear"
                        className={exampleClass('code')}
                        duration={240}
                    >
                        <CodeBlock value={text} />

                        <a className={exampleClass('toggle')} onClick={toggleCode}>
                            <Icon name={showCode ? 'code-close' : 'code'} />
                        </a>
                    </AnimationHeight>
                </div>
            </Lazyload>
        </>
    )
}

export default React.memo(Example)
