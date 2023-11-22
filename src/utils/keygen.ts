export function getDataItemKey(dataItem: Record<string | number, any>, keyName = 'value', index: number) {
    return dataItem[keyName] ?? index
}
