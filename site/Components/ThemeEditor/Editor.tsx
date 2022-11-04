import React, { useState } from 'react'
import { Button, ColorPicker, Form, Input, Select } from 'ethan-ui'
import cssAccessors from '@/utils/css-accessors'
import { editorClass } from 'doc/styles'
import CssInject from '@/utils/vars-inject'
import locate from 'doc/utils/locate'
import { isArray } from '@/utils/is'
import { compose } from '@/utils/func'
import moveable from '@/hoc/moveable'
import resizable from '@/hoc/resizable'
import { style } from '@/utils/expose'

interface EditorProps {
    visible: boolean

    onClose(): void
}

const modules = Object.keys(cssAccessors).sort((a, b) => a.localeCompare(b))

const defaultTheme = JSON.parse(JSON.stringify(cssAccessors))

const Editor: React.FC<EditorProps> = function (props) {
    const { visible, onClose } = props

    const [module, updateModule] = useState('color')

    const form = Form.useForm()

    function handleModuleSelectChange(m: string) {
        updateModule(m)

        const element = document.querySelector(`.${editorClass('body')}`)

        element.scrollTop = 0
    }

    function handleChange(value) {
        const setterName = `set${module.replace(/^\S/, (s) => s.toUpperCase())}`

        console.log(value, setterName)

        return

        if (value[setterName]) value[setterName](value)
    }

    function handleReset() {
        form.reset()

        style.setStyle(defaultTheme)
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

    const attributes = CssInject[module].conf

    return (
        <div className={editorClass('_', visible && 'show')}>
            <div className={editorClass('content')}>
                <div className={editorClass('zone')}>
                    <div className={editorClass('header')}>
                        <Select<string>
                            onFilter={(text, d) => d.indexOf(text.toLowerCase()) >= 0}
                            className={editorClass('select')}
                            data={modules}
                            value={module}
                            onChange={handleModuleSelectChange}
                        />
                    </div>
                    <div className={editorClass('body')}>
                        <Form labelAlign="top" defaultValue={cssAccessors[module]} onChange={handleChange}>
                            {attributes.map((attribute) => {
                                const { name, type, max, min, desc } = attribute

                                return (
                                    <Form.Item label={locate(desc, name)} key={name} name={name}>
                                        {({ onChange, value }) => {
                                            let element: React.ReactNode = null

                                            if (type === 'color') {
                                                element = (
                                                    <div className={editorClass('attr-item')}>
                                                        <Input value={value} width={180} onChange={onChange} />
                                                        <ColorPicker
                                                            format="rgba"
                                                            showIcon={false}
                                                            value={value}
                                                            onChange={onChange}
                                                            position="right-bottom"
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
                                                element = (
                                                    <Select keygen data={type} value={value} onChange={onChange} />
                                                )
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

const MixinEditor = compose(moveable(`.${editorClass('main')}`), resizable)(Editor)

export default React.memo(MixinEditor) as typeof Editor
