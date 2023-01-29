import React from 'react'
import Tag from './Tag'
import Input from './Input'
import { TagProps } from './type'

export interface TagComponent extends React.MemoExoticComponent<React.FC<TagProps>> {
    Input: typeof Input
}

const ComputedTag = Tag as TagComponent

ComputedTag.Input = Input

export default ComputedTag
