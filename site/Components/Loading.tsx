import React, { useEffect } from 'react'
import { Spin, Loading as loading } from 'ethan-ui'

function Loading({ style }) {
    useEffect(
        () => () => {
            loading.finish()
        },
        []
    )

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

export default React.memo(Loading)
