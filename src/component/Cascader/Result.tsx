import { cascaderClass, inputClass, selectClass } from '@/styles'
import { preventDefault, stopPropagation } from '@/utils/func'
import classnames from 'classnames'
import React, { useRef, useState } from 'react'
import Caret from '../icons/Caret'
import More from './More'
import { CascaderResultProps } from './type'

const CascaderResult: React.FC<CascaderResultProps> = function (props) {
    const {
        value,
        placeholder,
        compressed,
        getContent,
        getDataItemByKey,
        cascaderId,
        getNodeInfoByDataItem,
        multiple,
        clearable,
        isDisabled,
        onClear,
        onPathChange,
    } = props
    const [showNum, setShowNum] = useState(-1)

    function buildResult() {
        /** 存放所有选中的路径中的最后一个dataItem */
        const dataItems = []

        value.forEach((pathValue) => {
            /** 判断当前路径的所有value是否存在对应的Data */
            const currentPathValid = pathValue.every(getDataItemByKey)
            if (!currentPathValid) return
            const pathLastValue = pathValue[pathValue.length - 1]
            const pathLastDataItem = getDataItemByKey(pathLastValue)

            if (pathLastDataItem) {
                dataItems.push(pathLastDataItem)
            }
        })

        const items: React.ReactNode[] = []

        dataItems.forEach((dataItem, index) => {
            /** 将整个路径的内容都渲染出来 */
            const groupLastDataItem = getNodeInfoByDataItem(dataItem)
            if (!groupLastDataItem) return
            const { keyPath } = groupLastDataItem
            const content = keyPath.map((key) => getContent(getDataItemByKey(key))).join('/')

            items.push(
                <a
                    key={index}
                    tabIndex={-1}
                    className={cascaderClass('item')}
                    title={content}
                    onClick={() => {
                        /** @todo 支持多选后开放 */
                        // onPathChange(groupLastDataItem, false, false)
                    }}
                >
                    {content}
                </a>
            )
        })

        return items
    }

    function buildMore(nodes: React.ReactNode[]) {
        return [<More itemNodes={nodes} key="ethan-cascader-more" showNum={showNum} dataId={cascaderId} />]
    }

    function renderIndicator() {
        return !multiple ? (
            <a tabIndex={-1} className={selectClass('indicator', multiple ? 'multi' : 'caret')}>
                <Caret />
            </a>
        ) : null
    }

    function renderClear() {
        const className = classnames(selectClass('indicator', 'close'), cascaderClass('close'))

        if (clearable && value.length > 0 && !isDisabled) {
            return (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                    className={className}
                    onClick={onClear}
                    onMouseDown={(e) => {
                        stopPropagation(e)
                        preventDefault(e)
                    }}
                />
            )
        }

        return null
    }

    function renderResult() {
        let items = buildResult()

        if (compressed) {
            items = buildMore(items)
        }

        if (items.length === 0) {
            items.push(renderPlaceholder())
        }

        return items
    }

    function renderPlaceholder() {
        return (
            <span className={classnames(inputClass('placeholder'), selectClass('ellipsis'))} key="placeholder">
                {placeholder}
                &nbsp;
            </span>
        )
    }

    const result = value.length === 0 ? renderPlaceholder() : renderResult()
    const resultElementRef = useRef<HTMLDivElement>()

    return (
        <div className={cascaderClass('result')} ref={resultElementRef}>
            {result}
            {renderIndicator()}
            {renderClear()}
        </div>
    )
}

export default React.memo(CascaderResult)
