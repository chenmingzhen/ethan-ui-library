import { useState, useCallback, useEffect } from 'react'
import { debounce } from '@/utils/func'
import useRefMethod from './useRefMethod'

interface UseUpdateParams {
    debounceDuration?: number
}

const useUpdate = (props: UseUpdateParams = {}) => {
    const { debounceDuration } = props
    const [, update] = useState({})
    const handleUpdate = useCallback(() => {
        update({})
    }, [])
    const debounceUpdate = useRefMethod(debounce(handleUpdate, debounceDuration))

    useEffect(() => debounceUpdate.cancel, [])

    return debounceUpdate
}

export default useUpdate
