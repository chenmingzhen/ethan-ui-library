import React from 'react'
import Popover from './Popover'
import Confirm from './Confirm'
import { PopoverProps } from './type'

export interface PopoverComponent extends React.ComponentClass<PopoverProps> {
    Confirm: typeof Confirm
}

const ComputedPopover = Popover as unknown as PopoverComponent

ComputedPopover.Confirm = Confirm

export default ComputedPopover
