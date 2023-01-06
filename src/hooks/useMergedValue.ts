import { isFunc } from '@/utils/is'
import useIsomorphicLayoutUpdateEffect from './useIsomorphicLayoutUpdateEffect'
import useRefMethod from './useRefMethod'
import useSafeState from './useSafeState'

interface UseMergedValueProps<T, R extends Array<any>> {
    defaultStateValue: T | (() => T)
    options?: {
        defaultValue?: T
        value?: T
        onChange?: (value: T, prevValue: T, ...args: R) => void
    }
}

/** R为剩余参数的元组 */
type Updater<T, R extends Array<any>> = (updater: T | ((origin: T) => T), ...args: R) => void

function hasValue(value: any) {
    return value !== undefined
}

function useMergedValue<T, R extends Array<any> = never>(props: UseMergedValueProps<T, R>): [T, Updater<T, R>] {
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

    const triggerUpdate: Updater<T, R> = useRefMethod((updater, ...args) => {
        const nextValue = isFunc(updater) ? updater(mergedValue) : updater

        setInnerValue(nextValue)

        if (nextValue !== mergedValue) {
            onChangeFn(nextValue, mergedValue, ...args)
        }
    })

    return [mergedValue, triggerUpdate]
}

export default useMergedValue
