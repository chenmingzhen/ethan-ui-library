import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, ColorPicker, Form, Input, Select } from 'ethan-ui'
import cssAccessors from '@/utils/style/css-accessors'
import { editorClass } from 'doc/styles'
import CssInject from '@/utils/style/vars-inject'
import locate from 'doc/utils/locate'
import { isArray, isEmpty } from '@/utils/is'
import { style } from '@/utils/style'
import classnames from 'classnames'
import useDragPosition from '@/hooks/useDragPosition'
import { styles } from '@/utils/style/styles'
import { setTransformProp } from '@/utils/dom/translate'

interface EditorProps {
    onClose(): void
}

const modules = Object.keys(cssAccessors).sort((a, b) => a.localeCompare(b))
const defaultTheme = JSON.parse(JSON.stringify(cssAccessors))

const Editor: React.FC<EditorProps> = function (props) {
    const { onClose } = props
    const [componentModule, updateModule] = useState('color')
    const form = Form.useForm()
    const getDragTarget = useCallback(() => document.querySelector(`.${editorClass('_')}`), [])
    const { x, y, dragging } = useDragPosition({ getDragTarget })
    const ms = styles(
        !isEmpty(x) && !isEmpty(y) ? setTransformProp(`translate(${x}px, ${y}px)`) : undefined,
        dragging && { userSelect: 'none' }
    )

    function handleModuleSelectChange(m: string) {
        updateModule(m)

        const element = document.querySelector(`.${editorClass('body')}`)

        element.scrollTop = 0
    }

    function handleChange(value) {
        const setterName = `set${componentModule.replace(/^\S/, (s) => s.toUpperCase())}`

        cssAccessors[componentModule][setterName](value)
    }

    function handleReset() {
        style.setStyle(defaultTheme)

        form.setValue(defaultTheme[componentModule])
    }

    function handleDownload() {
        const template = `import { style } from 'ethan-ui';\nconst config = ${JSON.stringify(
            cssAccessors,
            null,
            2
        )};\nstyle.setStyle(config)
          `
        const a = document.createElement('a')

        a.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(template)}`)
        a.setAttribute('download', 'ethan.theme.js')
        a.style.display = 'none'

        document.body.appendChild(a)

        a.click()

        document.body.removeChild(a)
    }

    useEffect(() => {
        form.setValue(cssAccessors[componentModule])
    }, [componentModule])

    const attributes = useMemo(() => CssInject[componentModule].conf, [componentModule])

    return (
        <div className={classnames(editorClass('_'))} style={ms}>
            <div className={editorClass('content')}>
                <div className={editorClass('header')}>
                    <Select<string>
                        onFilter={(text, d) => d.indexOf(text.toLowerCase()) >= 0}
                        className={editorClass('select')}
                        data={modules}
                        value={componentModule}
                        onChange={handleModuleSelectChange}
                    />
                </div>
                <div className={editorClass('body')}>
                    <Form labelAlign="top" onChange={handleChange} form={form}>
                        {attributes.map((attribute) => {
                            const { name, type, max, min } = attribute

                            return (
                                <Form.Item label={name} key={name} name={name}>
                                    {({ onChange, value }) => {
                                        let element: React.ReactNode = null

                                        if (type === 'color') {
                                            element = (
                                                <div className={editorClass('attr-item')}>
                                                    <Input value={value} width={200} onChange={onChange} />
                                                    <ColorPicker
                                                        format="rgba"
                                                        showIcon={false}
                                                        value={value}
                                                        onChange={onChange}
                                                        position="right-bottom"
                                                        dropdownStyle={{ zIndex: 9999 }}
                                                        mode
                                                    />
                                                </div>
                                            )
                                        } else if (type === 'number') {
                                            element = (
                                                <Input.Number
                                                    min={min || 0}
                                                    max={max || 50}
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )
                                        } else if (isArray(type)) {
                                            element = <Select data={type} value={value} onChange={onChange} />
                                        } else {
                                            element = <Input value={value} onChange={onChange} />
                                        }

                                        return element
                                    }}
                                </Form.Item>
                            )
                        })}
                    </Form>
                </div>
            </div>
            <div className={editorClass('extra')}>
                <div className={editorClass('handler')} />
                <div className={editorClass('extra-content')}>
                    <Button onClick={handleReset}>{locate('重置', 'reset')}</Button>
                    <Button onClick={handleDownload} type="primary">
                        {locate('下载', 'download')}
                    </Button>
                </div>
            </div>
            <div className={editorClass('close')} onClick={onClose}>
                <span />
            </div>
        </div>
    )
}

export default React.memo(Editor)
