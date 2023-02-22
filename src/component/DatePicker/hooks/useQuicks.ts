import { isArray } from '@/utils/is'
import { useMemo } from 'react'
import { QuickSelect } from '../type'
import utils from '../utils'

function useQuicks<Value extends Date | Date[]>(quickSelects: QuickSelect<Value>[], format: string) {
    const quicks = useMemo<QuickSelect<Value>[]>(() => {
        if (!quickSelects) return []

        const results = []

        quickSelects.forEach((quickSelect) => {
            if (isArray(quickSelect.value)) {
                const date = quickSelect.value.map((v) => utils.toDateWithFormat(v, format))

                if (utils.isInvalid(date[0])) return

                if (date[1] && utils.isInvalid(date[1])) return

                results.push({ name: quickSelect.name, value: date })
            } else {
                const date = utils.toDateWithFormat(quickSelect.value, format)

                if (utils.isInvalid(date)) return

                results.push({ name: quickSelect.name, value: date })
            }
        })

        return results
    }, [quickSelects, format])

    return quicks
}

export default useQuicks
