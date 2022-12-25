import { useRef } from 'react'

/** 脱离生命周期只执行一次的hooks */
export default function useExecOnce(task: () => void) {
    const hasExec = useRef(false)

    if (hasExec.current) return

    task()

    hasExec.current = true
}
