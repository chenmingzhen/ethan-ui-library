import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { menuClass } from '@/styles'
import AnimationHeight from '@/component/List/AnimationHeight'
import Item from './Item'
import { MenuListProps, Mode } from './type'

interface IMenuListProps extends MenuListProps {
    rootMode: Mode
}

class List extends PureComponent<IMenuListProps> {
    render() {
        const {
            data,
            level,
            mode,
            renderItem,
            style,
            bottomLine,
            topLine,
            onClick,
            path,
            inlineIndent,
            toggleOpenKeys,
            rootMode,
        } = this.props

        const isVertical = mode.indexOf('vertical') === 0

        const className = classnames(menuClass('list', isVertical ? 'vertical' : mode), this.props.className)

        const innerUlElement = (
            <ul className={className} style={style}>
                {data.map((d, i) => (
                    <Item
                        bottomLine={bottomLine}
                        topLine={topLine}
                        disabled={d.disabled}
                        key={d.key ?? i}
                        index={i}
                        data={d}
                        renderItem={renderItem}
                        inlineIndent={inlineIndent}
                        level={level}
                        mode={mode}
                        onClick={onClick}
                        path={path}
                        toggleOpenKeys={toggleOpenKeys}
                        rootMode={rootMode}
                    />
                ))}
            </ul>
        )

        if (rootMode === 'horizontal') return innerUlElement

        return (
            <AnimationHeight height={this.props.open ? 'auto' : 0} duration={200}>
                {innerUlElement}
            </AnimationHeight>
        )
    }
}

export default List
