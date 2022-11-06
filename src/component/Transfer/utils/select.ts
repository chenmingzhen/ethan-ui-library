import { getKey } from '@/utils/uid'
import { TransferProps, TransferBaseData, TransferDefaultData } from '../type'

/**
 * 获取左右的勾选项
 */
function splitSelecteds<D extends TransferBaseData = TransferDefaultData, FD = D>(
    selectedKeys: FD[],
    props: TransferProps<D, FD>
) {
    if (!selectedKeys) return null

    const { data, keygen, datum } = props

    const left: FD[] = []
    const right: FD[] = []

    selectedKeys.forEach((selectedKey) => {
        const v = data.find((item, index) => getKey(item, keygen, index) === selectedKey)

        if (v) {
            if (datum.check(v)) right.push(selectedKey)
            else left.push(selectedKey)
        }
    })

    return [left, right]
}

export default splitSelecteds
