import immer, { Draft } from 'immer'
import { useState, useCallback } from 'react'

type UpdaterType<T> = ((draft: Draft<T> | T) => void) | T

const useImmer = <T>(initialValue: T): [T, (f: UpdaterType<T>) => void] => {
  const [val, updateValue] = useState(initialValue)

  return [
    val,
    useCallback((updater: (draft: Draft<T> | T) => void) => {
      if (typeof updater === 'function') updateValue(immer(updater as any))
      else updateValue(updater)
    }, []),
  ]
}

export default useImmer
