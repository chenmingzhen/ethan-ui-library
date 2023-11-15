import React from 'react'

// children[0]  Thead
// children[1] TBody
function Table({ children }) {
    const sortChildren = [...children[1].props.children]

    try {
        // localeCompare() 方法实现中文排序、sort方法实现数字英文混合排序
        sortChildren.sort((a, b) =>
            a.props.children[0].props.children[0].localeCompare(b.props.children[0].props.children[0])
        )
    } catch (e) {
        console.log('sort fail...')
    }

    return (
        <div style={{ overflow: 'auto' }}>
            <table className="doc-api-table">
                {children[0]}

                {React.cloneElement(children[1], {
                    children: sortChildren,
                })}
            </table>
        </div>
    )
}

export default Table
