import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import shallowEqual from '@/utils/shallowEqual'
import { useRef } from 'react'
import { SubMenuActions } from '../type'

interface UseOpenKeysProps {
    subMenuMapping: Map<React.Key, SubMenuActions>
    defaultValue?: React.Key[]
    value?: React.Key[]
    onChange: (keys: React.Key[]) => void
}

function useOpenKeys(props: UseOpenKeysProps) {
    const { defaultValue, value, onChange, subMenuMapping } = props

    const [openKeys, setOpenKeys] = useMergedValue<React.Key[]>({
        defaultStateValue: [],
        options: {
            value,
            onChange,
            defaultValue,
        },
    })

    const updateOpenKeys = useRefMethod((keys: React.Key[]) => {
        const submenuKeys = keys.filter((key) => subMenuMapping.has(key))

        if (!shallowEqual(submenuKeys, openKeys)) {
            setOpenKeys(submenuKeys)
        }
    })

    /** 立即打开，延迟关闭(避免移动到另一node时即触发关闭)  */
    const timer = useRef<NodeJS.Timeout>()
    const delaySetOpenKeys = useRefMethod((keys: React.Key[]) => {
        if (timer.current) {
            clearTimeout(timer.current)

            timer.current = null
        }

        if (keys.length) {
            updateOpenKeys(keys)
        } else {
            timer.current = setTimeout(() => {
                updateOpenKeys(keys)
            }, 150)
        }
    })

    return { openKeys, delaySetOpenKeys, syncSetOpenKeys: updateOpenKeys }
}

export default useOpenKeys
