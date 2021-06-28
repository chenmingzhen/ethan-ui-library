import React, { MemoExoticComponent } from 'react'
import Button, { ButtonProps } from './Button'
import Group from './Group'

interface ButtonComponent extends MemoExoticComponent<React.FC<ButtonProps>> {
    Group: typeof Group
}

const ComputedButton = Button as ButtonComponent

ComputedButton.Group = Group

export default ComputedButton
