/**
 * cn - 弹出展示
 *    -- 设置 popup 属性后，children 会通过弹出框展示
 * en - Popup
 *    -- After setting the popup property, children will be displayed through a popup box
 */
import React from 'react'
import { Progress, Button } from 'ethan-ui'

const PopupProgress = () => {
    const [value, updateValue] = React.useState(0)

    function dispatchProgress(dispatchValue = value) {
        dispatchValue += Math.random() * 12

        if (dispatchValue >= 100) {
            dispatchValue = 100
        }

        updateValue(dispatchValue)
    }

    React.useEffect(() => {
        if (value < 100 && value !== 0) {
            setTimeout(dispatchProgress, 160)
        }
    }, [value])

    return (
        <div style={{ width: 400 }}>
            <Progress value={value} popup>{`${Math.floor(value)}%`}</Progress>

            <br />

            <Button
                onClick={() => {
                    dispatchProgress(0)
                }}
            >
                Start
            </Button>
        </div>
    )
}

export default PopupProgress
