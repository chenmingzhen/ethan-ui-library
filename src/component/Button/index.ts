import React, { MemoExoticComponent } from 'react'
import Button from './Button'
import Group from './Group'
import { ButtonProps } from './type'

export interface ButtonComponent extends MemoExoticComponent<React.FC<ButtonProps>> {
    Group: typeof Group

    IS_ETHAN_BUTTON: true
}

const ComputedButton = Button as ButtonComponent

ComputedButton.Group = Group

ComputedButton.IS_ETHAN_BUTTON = true

export default ComputedButton
