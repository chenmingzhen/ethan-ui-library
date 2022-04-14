import React from 'react'
import classnames from 'classnames'
import { treeClass } from '@/styles'
import List from './List'

function Root(props) {
    const className = classnames(treeClass('_', props.line ? 'with-line' : 'no-line'), props.className)

    return <List {...props} className={className} expanded isRoot />
}

Root.defaultProps = {
    data: [],
    line: true,
}

export default React.memo(Root)
