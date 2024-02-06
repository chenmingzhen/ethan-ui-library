import { RecursiveMenuWithExtraData } from './type'

export const ETHAN_MENU_SEPARATOR = '_E@T_'

/** 由于Item组件可能未挂载，导致未进行注册，需要预计算一下path，用于设置了defaultActiveKey或activeKey时，能够找到对应的activePath */
export function generateMeasurePathMapping(
    data: RecursiveMenuWithExtraData[],
    parentPath: React.Key[] = []
): Map<React.Key, React.Key[]> {
    const pathMapping = new Map<React.Key, React.Key[]>()

    data.forEach((item) => {
        const currentPath = [...parentPath, item.key]
        pathMapping.set(item.key, currentPath)

        if (item.children) {
            const childrenPathMap = generateMeasurePathMapping(item.children, currentPath)

            childrenPathMap.forEach((childrenPath, key) => {
                pathMapping.set(key, childrenPath)
            })
        }
    })

    return pathMapping
}

export const INTERNAL_MORE_KEY = '__INTERNAL_MORE_KEY__'
