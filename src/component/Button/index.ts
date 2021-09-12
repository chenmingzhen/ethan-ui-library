import React, { MemoExoticComponent } from 'react'
import Button, { ButtonProps } from './Button'
import Group, { ButtonGroupProps } from './Group'

export interface ButtonComponent extends MemoExoticComponent<React.FC<ButtonProps>> {
    Group: typeof Group

    IS_ETHAN_BUTTON: true
}

export { ButtonProps, ButtonGroupProps }

const ComputedButton = Button as ButtonComponent

ComputedButton.Group = Group

ComputedButton.IS_ETHAN_BUTTON = true

export default ComputedButton
