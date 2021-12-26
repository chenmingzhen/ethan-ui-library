import React from 'react'
import Popover, { PopoverProps } from './Popover'
import Confirm, { ConfirmProps as PopoverConfirmProps } from './Confirm'

export interface PopoverComponent extends React.ComponentClass<PopoverProps> {
    Confirm: typeof Confirm
}

export { PopoverProps, PopoverConfirmProps }

const ComputedPopover = (Popover as unknown) as PopoverComponent

ComputedPopover.Confirm = Confirm

export default ComputedPopover
