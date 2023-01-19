import { getKey } from '@/utils/uid'
import { TransferBaseData, TransferDefaultData } from '../type'

/**
 * 获取左右的勾选项
 */
function splitSelecteds<D extends TransferBaseData = TransferDefaultData, FD = D>(
    selectedKeys: FD[],
    data,
    keygen,
    check
) {
    if (!selectedKeys) return undefined

    const left: FD[] = []
    const right: FD[] = []

    selectedKeys.forEach((selectedKey) => {
        const v = data.find((item, index) => getKey(item, keygen, index) === selectedKey)

        if (v) {
            if (check(v)) right.push(selectedKey)
            else left.push(selectedKey)
        }
    })

    return [left, right]
}

export default splitSelecteds
