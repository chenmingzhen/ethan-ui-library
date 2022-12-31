import { isFunc } from '@/utils/is'
import useIsomorphicLayoutUpdateEffect from './useIsomorphicLayoutUpdateEffect'
import useRefMethod from './useRefMethod'
import useSafeState from './useSafeState'

interface UseMergedValueProps<T> {
    defaultStateValue: T | (() => T)
    options?: {
        defaultValue?: T
        value?: T
        onChange?: (value: T, prevValue: T) => void
    }
}

type Updater<T> = (updater: T | ((origin: T) => T)) => void

function hasValue(value: any) {
    return value !== undefined
}

function useMergedValue<T>(props: UseMergedValueProps<T>): [T, Updater<T>] {
    const { defaultStateValue, options = {} } = props
    const { defaultValue, value, onChange } = options

    const [innerValue, setInnerValue] = useSafeState<T>(() => {
        if (hasValue(value)) {
            return value
        }
        if (hasValue(defaultValue)) {
            return defaultValue
        }
        return isFunc(defaultStateValue) ? defaultStateValue() : defaultStateValue
    })

    const mergedValue = hasValue(value) ? value : innerValue

    const onChangeFn = useRefMethod(onChange)

    useIsomorphicLayoutUpdateEffect(() => {
        if (!hasValue(value)) {
            setInnerValue(value)
        }
    }, [value])

    const triggerUpdate: Updater<T> = useRefMethod((updater) => {
        const nextValue = isFunc(updater) ? updater(mergedValue) : updater

        setInnerValue(nextValue)

        if (nextValue !== mergedValue) {
            onChangeFn(nextValue, mergedValue)
        }
    })

    return [mergedValue, triggerUpdate]
}

export default useMergedValue
