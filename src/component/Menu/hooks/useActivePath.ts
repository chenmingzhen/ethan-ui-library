import React, { useMemo } from 'react'
import useMergedValue from '@/hooks/useMergedValue'
import { generateMeasurePathMapping } from '../util'
import { MenuProps } from '../type'

type UseActivePathProps = Pick<MenuProps, 'data' | 'defaultActiveKey' | 'activeKey'>

const useActivePath = (props: UseActivePathProps): [React.Key[], (path: React.Key[]) => void] => {
    const { data, defaultActiveKey, activeKey } = props
    const measurePathMapping = useMemo(() => generateMeasurePathMapping(data), [])
    const [activePath, setActivePath] = useMergedValue<React.Key[]>({
        defaultStateValue: [],
        options: {
            defaultValue: defaultActiveKey !== undefined ? measurePathMapping.get(defaultActiveKey) || [] : undefined,
            value: activeKey !== undefined ? measurePathMapping.get(activeKey) || [] : undefined,
        },
    })

    return [activePath, setActivePath]
}

export default useActivePath
