import React, { useState, createElement, useRef } from 'react'
import { LazyLoad, Motion, Spin } from 'ethan-ui'
import Icon from 'doc/icons/Icon'
import { exampleClass } from 'doc/styles'
import CodeBlock from '../MarkDown/CodeBlock'

interface ExampleProps {
    component: React.ComponentType
    id: string
    rawText: string
    title: string
}

const Example: React.FC<ExampleProps> = ({ component, id, rawText = '', title: propsTitle }) => {
    const [showCode, setShowCode] = useState(false)
    const ExampleComponent = useRef(createElement(component)).current
    /** 去除注释 */
    const text = rawText.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/, '').trim()

    const [title, ...sub] = propsTitle.split('\n')

    const toggleCode = () => {
        setShowCode(!showCode)
    }

    return (
        <>
            {title && <h3 id={id}>{title}</h3>}

            <LazyLoad
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

                    <Motion.Transition visible={showCode} transitionTypes={['collapse', 'fade']}>
                        <CodeBlock value={text} />

                        <a className={exampleClass('toggle')} onClick={toggleCode}>
                            <Icon name={showCode ? 'code-close' : 'code'} />
                        </a>
                    </Motion.Transition>
                </div>
            </LazyLoad>
        </>
    )
}

export default React.memo(Example)
