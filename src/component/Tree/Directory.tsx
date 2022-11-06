import React from 'react'
import { PureComponent } from '@/utils/component'
import Tree from './Tree'
import { DirectoryProps } from './type'

export default class Directory<T> extends PureComponent<DirectoryProps<T>> {
    static displayName = 'EthanTreeDirectory'

    render() {
        return (
            <Tree<T>
                {...this.props}
                directory
                nodeContentTextTag="div"
                mode={undefined}
                onChange={undefined}
                onDrop={undefined}
                dragImageSelector={undefined}
            />
        )
    }
}
