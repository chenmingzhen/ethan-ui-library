/**
 * cn - 禁用
 *    -- 设置 disabled 为 true 禁用 switch
 * en - Disabled
 *    -- disabled check while disabled true
 */
import React, { useCallback, useState } from 'react'
import { Switch, Button } from 'ethan-ui'

export default function () {
    const [disabled, updateDisabled] = useState(true)

    const handleToggle = useCallback(() => {
        updateDisabled(!disabled)
    }, [disabled])

    return (
        <div>
            <Switch disabled={disabled} />
            <Button style={{ marginInlineStart: 14 }} type="primary" onClick={handleToggle}>
                Toggle
            </Button>
        </div>
    )
}
