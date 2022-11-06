import React from 'react'
import { PureComponent } from '@/utils/component'
import { editableAreaClass } from '@/styles'
import classnames from 'classnames'
import { focusElement, getParent } from '@/utils/dom/element'
import { getUidStr } from '@/utils/uid'
import { EditableProps } from './type'
import Popover from '../Popover/Popover'
import icons from '../icons'
import Input from '../Input'
import Textarea from '../Textarea'

interface EditableAreaState {
    value: string
    showTextarea: boolean
}

const formatShowValue = (value: string) => {
    if (!value) return ''

    const arr = String(value).split('\n')

    const len = arr.length

    if (len > 1) return `${arr[0]}...`

    return String(value)
}

export default class EditableArea extends PureComponent<EditableProps, EditableAreaState> {
    static displayName = 'EthanEditableArea'

    popWidth = 0

    input = React.createRef<HTMLInputElement>()

    container = React.createRef<HTMLDivElement>()

    textareaId = getUidStr()

    constructor(props) {
        super(props)

        this.state = {
            value: props.value,
            showTextarea: false,
        }
    }

    componentDidUpdate(prevProps: EditableProps, prevState: EditableAreaState) {
        const { value } = this.props

        const { showTextarea } = this.state

        if (prevState.showTextarea !== showTextarea && showTextarea) {
            this.autoFocus()
        }

        if (value !== prevProps.value) {
            this.setState({ value })
        }
    }

    autoFocus = () => {
        setTimeout(() => {
            const target = document.getElementById(this.textareaId)

            if (target) focusElement.end(target)
        }, 100)
    }

    dispatchShowTextarea = (show: boolean) => {
        if (show && this.input.current) {
            this.popWidth = getParent(this.input.current, `.${editableAreaClass('input')}`)?.offsetWidth
        }

        this.setState({ showTextarea: show })
    }

    handleChange = (value) => {
        const { onChange } = this.props

        if (onChange) onChange(value)

        this.setState({ value })
    }

    handleBlur = (e) => {
        const { onBlur } = this.props

        if (onBlur) onBlur(e)

        this.dispatchShowTextarea(false)
    }

    render() {
        const {
            className,
            style,
            getPopupContainer,
            placeholder,
            disabled,
            bordered,
            width,
            clearable,
            maxHeight,
            onFocus,
        } = this.props

        const { showTextarea, value } = this.state

        const cls = classnames(className, editableAreaClass('_', !bordered && 'none-bordered'))

        const ms = Object.assign({ width }, style)

        const popStyle: React.CSSProperties = { width: this.popWidth }

        return (
            <Popover
                visible={showTextarea}
                showArrow={false}
                className={editableAreaClass('popover')}
                innerProps={{ style: popStyle }}
                getPopupContainer={getPopupContainer}
                animation={false}
                placement="cover"
                content={
                    <div ref={this.container}>
                        <Textarea
                            className={editableAreaClass('text-area')}
                            autoSize
                            value={value}
                            rows={1}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            onFocus={onFocus}
                            placeholder={placeholder}
                            maxHeight={maxHeight}
                            id={this.textareaId}
                        />
                    </div>
                }
            >
                <div className={cls} style={ms}>
                    <Input
                        forwardedRef={this.input}
                        placeholder={placeholder}
                        value={formatShowValue(value)}
                        className={editableAreaClass('input')}
                        onFocus={this.dispatchShowTextarea.bind(this, true)}
                        disabled={disabled}
                    />

                    {clearable && value ? (
                        <div className={editableAreaClass('clear')} onClick={this.handleChange.bind(this, '')}>
                            {icons.CloseCircle}
                        </div>
                    ) : null}
                </div>
            </Popover>
        )
    }
}
