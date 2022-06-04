import React from 'react'
import { selectClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { getUidStr } from '@/utils/uid'
import { getParent, isDescendent } from '@/utils/dom/element'
import { docSize } from '@/utils/dom/document'
import { SelectOptionListBindFuncMap, SelectState, ISelectProps } from './type'
import Result from './Result2'
import OptionList from './OptionList'
import AbsoluteList from '../List/AbsoluteList'

class Select extends PureComponent<ISelectProps, SelectState> {
    static defaultProps = {
        clearable: false,
        data: [],
        height: 250,
        itemsInView: 10,
        lineHeight: 32,
        loading: false,
        multiple: false,
        renderItem(item) {
            if (typeof item === 'string' || typeof item === 'number') {
                return item
            }

            console.error(
                `RenderItem or RenderResult must return reactNode.But Got ${typeof item}.Maybe you passed a wrong value or didn't pass it`
            )

            return null
        },
        text: {},
        compressed: false,
        trim: true,
        autoAdapt: false,
        showArrow: true,
        focusSelected: true,
    }

    element: HTMLDivElement

    selectId = getUidStr()

    inputReset: () => void

    selectOptionListFuncMap: SelectOptionListBindFuncMap

    isRender = false

    afterActionKeepFocus = false

    clickLockTimer: NodeJS.Timeout

    constructor(props) {
        super(props)

        this.state = {
            control: 'mouse',
            focus: false,
            position: 'drop-down',
        }
    }

    /**
     *  @description
     *  select的容器使用了onBlur和onFocus，有时候点击select里面的元素，不用失去焦点。
     *  使用afterActionKeepFocus标记去阻止重新执行focus和blur事件
     */
    startKeepFocus = () => {
        /** 标记操作的DOM仍然是属于Select组件，阻止聚焦和失焦 */
        this.afterActionKeepFocus = true

        setTimeout(() => {
            /** 虽然阻止了handleBlur和handleFocus的执行，此时的Select容器已经是失去焦点状态，重新拿回焦点 */
            this.element.focus()

            this.afterActionKeepFocus = false
        }, 30)
    }

    bindClickAway = () => {
        /** 使用mousedown代替click，因为mousedown的执行时先于blur */
        document.addEventListener('mousedown', this.handleClickAway, true)
    }

    clearClickAway = () => {
        document.removeEventListener('mousedown', this.handleClickAway, true)
    }

    bindOptionListFunc = (funcMap: SelectOptionListBindFuncMap) => {
        this.selectOptionListFuncMap = funcMap
    }

    bindElement = (element: HTMLDivElement) => {
        this.element = element
    }

    handleControlChange = (control: SelectState['control']) => {
        if (control !== this.state.control) this.setState({ control })
    }

    handleClickAway = (evt: MouseEvent) => {
        const desc = isDescendent(evt.target as HTMLElement, this.selectId)

        if (desc) return

        this.element.blur()
    }

    handleBlur: React.FocusEventHandler<HTMLDivElement> = evt => {
        if (this.afterActionKeepFocus) return

        /**
         * FocusEvent.relatedTarget
         * @see https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
         */

        if (evt.relatedTarget && getParent(evt.relatedTarget as HTMLElement, `.${selectClass('result')}`)) {
            return
        }

        this.props.onBlur(evt)

        this.clearClickAway()

        this.handleFocusStateChange(false, evt)
    }

    handleChange = (dataItem: any, fromInput = false) => {
        const { datum, multiple, disabled } = this.props

        if (disabled === true || this.clickLockTimer) return

        /** 以动画持续时间做锁的时间 */
        this.clickLockTimer = setTimeout(() => {
            this.clickLockTimer = null
        }, 240)

        this.startKeepFocus()

        if (multiple) {
            const checked = !datum.check(dataItem)

            if (checked) {
                datum.add(dataItem)
            } else {
                datum.remove(dataItem)
            }
        } else {
            datum.set(dataItem)

            this.handleFocusStateChange(false)
        }
    }

    handleFocusStateChange = (focus: boolean, e?) => {
        const { disabled, height, onCollapse, position } = this.props

        if (disabled === true) return

        if (this.state.focus === focus) return

        if (focus && e && e.target.classList.contains(selectClass('close'))) return

        let newPosition = position || 'drop-down'

        const windowHeight = docSize.height

        const bottom = height + this.element.getBoundingClientRect().bottom

        if (bottom > windowHeight && !newPosition) newPosition = 'drop-up'

        if (onCollapse) onCollapse(focus)

        /** 当下拉框被隐藏时，不需要清除ClickAway事件，因为此时的Select的element还处于focus,当Select失去焦点时才清除ClickAway事件 */
        if (focus) {
            this.bindClickAway()
        }

        this.setState({ focus, position: newPosition })
    }

    handleFocus: React.FocusEventHandler<HTMLDivElement> = evt => {
        if (this.afterActionKeepFocus) return

        this.props.onFocus(evt)
    }

    handleClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        if (!getParent(evt.target as HTMLElement, `.${selectClass('result')}`) && evt.target !== this.element) {
            return
        }

        const { onInput } = this.props

        const { focus } = this.state

        const plain = !onInput

        if (plain && focus) {
            this.handleFocusStateChange(false, evt)
        } else {
            this.handleFocusStateChange(true, evt)
        }
    }

    handleInputFocus = () => {}

    handleEnter = () => {
        const { data, groupKey } = this.props

        const hoverIndex = this.selectOptionListFuncMap.getHoverIndex?.()

        const hoverData = data[hoverIndex]

        if (hoverData && !hoverData[groupKey]) {
            this.handleChange(hoverData)

            this.selectOptionListFuncMap.handleHover?.(hoverIndex)

            // this.startKeepFocus()
        }
    }

    handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = evt => {
        const { focus } = this.state

        if (evt.keyCode === 13 && !focus) {
            evt.preventDefault()

            this.handleClick(evt)

            return
        }

        if (evt.keyCode === 9) {
            if (this.element) this.element.blur()

            if (focus) this.handleFocusStateChange(false, evt)

            return
        }

        if (!focus) return

        this.handleControlChange('keyboard')

        switch (evt.keyCode) {
            case 38:
                evt.preventDefault()

                if (this.selectOptionListFuncMap) {
                    this.selectOptionListFuncMap.hoverMove(-1)
                }

                break
            case 40:
                evt.preventDefault()

                if (this.selectOptionListFuncMap) {
                    this.selectOptionListFuncMap.hoverMove(1)
                }

                break
            case 13:
                if (this.selectOptionListFuncMap) {
                    this.handleEnter()
                }

                evt.stopPropagation()

                evt.preventDefault()

                break
            default:
                break
        }
    }

    handleClear = () => {
        const { datum } = this.props

        const { focus } = this.state

        datum.set([])

        /** 此处按常理 自己将元素focus即可，
         * 但是前面的动作执行的blur的操作，同时执行focus只会生效第一个blur，
         * 所以也加入到延时任务中 */
        this.startKeepFocus()

        if (focus) {
            this.handleFocusStateChange(false)
        }
    }

    handleRemove = dataItem => {
        this.handleChange(dataItem)
    }

    renderItem = (data: any, index?: number) => {
        const { renderItem } = this.props

        return typeof renderItem === 'function' ? renderItem(data, index) : data[renderItem]
    }

    renderList = () => {
        const { focus, position } = this.state
        const { autoAdapt, absolute } = this.props

        if (!focus && !this.isRender) return null

        this.isRender = true

        const props: any = {}
        ;[
            'data',
            'datum',
            'keygen',
            'multiple',
            'columns',
            'columnWidth',
            'columnsTitle',
            'text',
            'itemsInView',
            'absolute',
            'lineHeight',
            'height',
            'loading',
            'onInput',
            'filterText',
            'zIndex',
            'groupKey',
        ].forEach(k => {
            props[k] = this.props[k]
        })

        const List = OptionList

        return (
            <AbsoluteList
                rootClass={selectClass(position)}
                focus={focus}
                getParentElement={() => this.element}
                position={position}
                absolute={absolute}
                fixed={autoAdapt ? 'min' : true}
            >
                <List
                    {...props}
                    focus={focus}
                    selectId={this.selectId}
                    className={selectClass(autoAdapt && 'auto-adapt')}
                    bindOptionListFunc={this.bindOptionListFunc}
                    onChange={this.handleChange}
                    renderItem={this.renderItem}
                    control={this.state.control}
                    onControlChange={this.handleControlChange}
                />
            </AbsoluteList>
        )
    }

    renderOptions = () => {
        return this.renderList()
    }

    render() {
        const { position, focus } = this.state

        const {
            placeholder,
            multiple,
            clearable,
            disabled,
            size,
            datum,
            filterText,
            onCreate,
            result,
            compressed,
            showArrow,
            compressedClassName,
            resultClassName,
            onInput,
        } = this.props

        const className = selectClass(
            'inner',
            size,
            focus && 'focus',
            position,
            multiple && 'multiple',
            disabled === true && 'disabled'
        )

        const renderResult = this.props.renderResult || this.renderItem

        return (
            <div
                tabIndex={disabled === true ? -1 : 0}
                ref={this.bindElement}
                className={className}
                data-id={this.selectId}
                onFocus={this.handleFocus}
                onClick={this.handleClick}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
            >
                <Result
                    filterText={filterText}
                    onClear={clearable ? this.handleClear : undefined}
                    onCreate={onCreate}
                    onInput={onInput}
                    onRemove={this.handleRemove}
                    datum={datum}
                    disabled={disabled}
                    focus={this.state.focus}
                    result={result}
                    multiple={multiple}
                    placeholder={placeholder}
                    renderResult={renderResult}
                    onInputFocus={this.handleInputFocus}
                    compressed={compressed}
                    showArrow={showArrow}
                    compressedClassName={compressedClassName}
                    resultClassName={resultClassName}
                    size={size}
                    onInputBlur={() => {}}
                />

                {this.renderOptions()}
            </div>
        )
    }
}

export default Select
