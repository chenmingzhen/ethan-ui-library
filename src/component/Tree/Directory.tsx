import React from 'react'
import { PureComponent } from '@/utils/component'
import Tree from './Tree'
import { DirectoryProps } from './type'

export default class Directory extends PureComponent<DirectoryProps> {
    render() {
        return (
            <Tree
                {...this.props}
                directory
                nodeContentTextTag="div"
                mode={undefined}
                onChange={undefined}
                onDrop={undefined}
            />
        )
    }
}
