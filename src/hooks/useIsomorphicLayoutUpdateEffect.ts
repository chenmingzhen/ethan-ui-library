import { useIsomorphicLayoutEffect, useFirstMountState } from 'react-use'

const useIsomorphicLayoutUpdateEffect = (effect, deps) => {
    const isFirstMount = useFirstMountState()

    useIsomorphicLayoutEffect(() => {
        if (!isFirstMount) {
            return effect()
        }
        return undefined
    }, deps)
}
export default useIsomorphicLayoutUpdateEffect
