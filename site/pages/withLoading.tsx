import { Loading } from 'ethan-ui'
import React, { useEffect } from 'react'

function withLoading<P = {}>(Component: React.ComponentType<P>): React.FC<P> {
    const wrappedLoadingWrapper: React.FC<P> = (props) => {
        useEffect(() => {
            Loading.finish()

            return () => {
                Loading.start()
            }
        }, [])

        return <Component {...props} />
    }

    return React.memo(wrappedLoadingWrapper)
}

export default withLoading
