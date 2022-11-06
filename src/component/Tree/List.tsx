import { treeClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { empty } from '@/utils/func'
import React, { createRef } from 'react'
import Branch from './Branch'
import Node from './Node'
import { TreeListProps, TreeListState } from './type'

class List extends PureComponent<TreeListProps, TreeListState> {
    list = createRef<HTMLDivElement>()

    constructor(props) {
        super(props)

        const { expanded } = props.bindList(props.id, this.update)

        this.state = { expanded, isDragging: false }
    }

    componentDidMount() {
        /** For drag */
        const { expanded } = this.props.bindList(this.props.id, this.update)

        this.setState({ expanded })
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.props.unbindList(this.props.id)
    }

    handleToggle = () => {
        const { id, onToggle } = this.props
        // eslint-disable-next-line
        const expanded = !this.state.expanded

        this.setState({ expanded })

        if (onToggle) onToggle(id, expanded)
    }

    update = (expanded: boolean) => {
        this.setState({ expanded })
    }

    handleDragStateChange = (isDragging) => {
        this.setState({ isDragging })
    }

    render() {
        const { data, childrenKey } = this.props

        const { isDragging } = this.state

        const children = data[childrenKey]

        return (
            <div
                className={treeClass('list', isDragging && 'isDragging')}
                ref={this.list}
                onDrop={empty}
                onDragOver={empty}
            >
                <Node
                    {...this.props}
                    expanded={this.state.expanded}
                    onToggle={this.handleToggle}
                    hoverElementRef={this.list}
                    onDragStateChange={this.handleDragStateChange}
                />

                {children && (
                    <Branch
                        {...this.props}
                        parentKey={this.props.id}
                        expanded={this.state.expanded}
                        data={children}
                        isRoot={false}
                    />
                )}
            </div>
        )
    }
}

export default List
