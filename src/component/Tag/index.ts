import React from 'react'
import Tag, { TagProps } from './Tag'
import Input, { TagInputProps } from './Input'

export { TagProps, TagInputProps }

export interface TagComponent extends React.MemoExoticComponent<React.FC<TagProps>> {
    Input: typeof Input
}

const ComputedTag = Tag as TagComponent

ComputedTag.Input = Input

export default ComputedTag
