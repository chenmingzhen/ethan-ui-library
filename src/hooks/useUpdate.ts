import { useState, useCallback } from 'react'

const useUpdate = () => {
    const [, update] = useState({})

    const handleUpdate = useCallback(() => {
        update({})
    }, [])

    return handleUpdate
}

export default useUpdate
