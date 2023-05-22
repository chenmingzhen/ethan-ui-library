import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { debounce } from '@/utils/func'

interface UseOpenKeysProps {
    defaultValue?: React.Key[]
    value?: React.Key[]
    onChange: (keys: React.Key[]) => void
}

function useOpenKeys(props: UseOpenKeysProps) {
    const { defaultValue, value, onChange } = props
    const [openKeys, setOpenKeys] = useMergedValue<React.Key[]>({
        defaultStateValue: [],
        options: {
            value,
            onChange,
            defaultValue,
        },
    })

    /** 当鼠标离开操作范围时，不能立即消失，需要延迟一段时间，当鼠标划入到另外的操作范围时，应将上一次的动作取消 */
    const delaySetOpenKeys = useRefMethod(
        debounce((keys) => {
            setOpenKeys(keys)
        }, 150)
    )

    return { openKeys, delaySetOpenKeys, syncSetOpenKeys: setOpenKeys }
}

export default useOpenKeys
