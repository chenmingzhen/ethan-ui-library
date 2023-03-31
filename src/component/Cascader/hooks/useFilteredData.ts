import useRefMethod from '@/hooks/useRefMethod'
import { isEmpty, isFunc } from '@/utils/is'
import { useMemo } from 'react'
import { CascaderData, CascaderDataValueType, CascaderNode } from '../type'

interface UseFilteredDataProps {
    filterText: string
    nodeMapping: Map<CascaderDataValueType, CascaderNode>
    onFilter?: ((text: string, node: CascaderNode) => boolean) | boolean
    getDataItemByKey(key: CascaderDataValueType): CascaderData
    getContent(dataItem: CascaderData): React.ReactNode
}

export default function useFilteredData(props: UseFilteredDataProps) {
    const { filterText, nodeMapping, getDataItemByKey, onFilter, getContent } = props

    const handleFilter = useRefMethod((text: string, node: CascaderNode) => {
        if (isFunc(onFilter)) {
            return onFilter(text, node)
        }

        const nodeContent = node.keyPath.map((key) => getContent(getDataItemByKey(key))).join('')

        if (nodeContent.includes(filterText)) return true
    })

    const filteredData = useMemo(() => {
        if (!onFilter || isEmpty(filterText)) return []

        const dataItems: CascaderData[] = []

        nodeMapping.forEach((node) => {
            const { children, keyPath } = node
            if (children.length) return
            const dataItem = getDataItemByKey(keyPath[keyPath.length - 1])
            const pass = handleFilter(filterText, node)

            if (pass) {
                dataItems.push(dataItem)
            }
        })

        return dataItems
    }, [nodeMapping, filterText])

    return filteredData
}
