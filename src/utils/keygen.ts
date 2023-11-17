export function getDataItemKey(dataItem: Record<string | number, any>, key = 'value', index: number) {
    return dataItem[key] ?? index
}
