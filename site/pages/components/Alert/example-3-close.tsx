/**
 * cn - 关闭
 *    -- 设置 onClose 属性时，显示关闭按钮
 *    -- onClose 为 true 时，只关闭提示，不处理
 *    -- onClose 为函数时，关闭后调用此函数
 * en - onClose
 *    -- When the onClose property is set, the close button is displayed.
 *    -- When the onClose property is true, only hide the component.
 *    -- When the onClose is a function, call this function after hiding it.
 */
import React from 'react'
import { Alert } from 'ethan-ui'

export default function () {
    const [placeholder, setPlaceholder] = React.useState('')

    return (
        <div>
            <Alert onClose>Alert onClose=true</Alert>

            <Alert
                onClose={() => {
                    setPlaceholder('Alert was dismissed.')
                }}
            >
                Alert onClose=function
            </Alert>

            {placeholder && <Alert type="info">{placeholder}</Alert>}
        </div>
    )
}
