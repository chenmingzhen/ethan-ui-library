import React from 'react'
import { useMount, useUnmount } from 'react-use'
import { Spin, Loading as ld } from 'ethan-ui'

function Loading({ style }) {
    useMount(() => {
        ld.start()
    })

    useUnmount(() => {
        ld.finish()
    })

    return (
        <div
            style={Object.assign(
                {
                    display: 'flex',
                    width: '100%',
                    height: 300,
                },
                style
            )}
        >
            <Spin size="54px" name="four-dots" color="#53a0fd" />
        </div>
    )
}

Loading.defaultProps = {
    style: {},
}

export default Loading
