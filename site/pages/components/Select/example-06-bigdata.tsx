/**
 * cn - 性能
 *    -- Select 内部用懒加载机制来优化性能，本例加载了10000条数据。
 * en - Performance
 *    -- Select uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.
 */
import React from 'react'
import { Select } from 'ethan-ui'
import { fetchSync as fetchUser } from 'doc/data/user'

const users = fetchUser(10000)
const style = { width: 240, marginBottom: 12, display: 'block' }

export default function() {
    return (
        <Select
            data={users}
            keygen="id"
            format="id"
            defaultValue={3}
            style={style}
            placeholder="Select a user"
            renderItem={(user, i) => `${user.firstName} ${user.lastName} (${i + 1})`}
            renderResult={user => `${user.firstName} ${user.lastName}`}
        />
    )
}
