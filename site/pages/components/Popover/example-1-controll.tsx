/**
 * cn - 受控
 *    -- 可以通过 visible 去控制
 * en -  controll
 *    -- Use cisible to controll the show/hidden
 */
import React from 'react'
import { Button, Popover } from 'ethan/index'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
        }
    }

    render() {
        const { visible } = this.state

        const newVisible = !this.state.visible

        return (
            <Popover visible={visible} style={{ width: 200, padding: 20 }} content="some text" title="control">
                <Button
                    onClick={() => {
                        this.setState({ visible: newVisible })
                    }}
                >
                    Hover
                </Button>
            </Popover>
        )
    }
}
