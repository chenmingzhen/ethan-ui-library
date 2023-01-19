import React, { memo, useContext } from 'react'
import { transferClass } from '@/styles'
import { getKey } from '@/utils/uid'
import Button from '../Button'
import icons from '../icons'
import { TransferOperationButtonProps } from './type'
import { TransferContext } from './context'

const OperationButtons: React.FC<TransferOperationButtonProps> = (props) => {
    const { setSelectedKeys: setSelecteds, selectedKeys: selecteds } = useContext(TransferContext)

    const { data, operations, operationIcon, disabled, add, remove, keygen } = props

    function handleChange(index: number) {
        const newValue = selecteds[1 - index].map((c) => data.find((d, i) => getKey(d, keygen, i) === c))

        setSelecteds(1 - index, [])

        if (index) {
            add(newValue, true)
        } else {
            remove(newValue)
        }
    }

    const disable = disabled === true

    return (
        <div className={transferClass('btns')}>
            <div>
                <Button
                    type="primary"
                    disabled={disable || !selecteds[0].length}
                    size="small"
                    className={transferClass('btns-button', 'btns-bottom')}
                    onClick={() => {
                        handleChange(1)
                    }}
                >
                    {operationIcon && icons.AngleRight}
                    {operations[0]}
                </Button>
                <br />
                <Button
                    type="primary"
                    disabled={disable || !selecteds[1].length}
                    size="small"
                    className={transferClass('btns-button')}
                    onClick={() => {
                        handleChange(0)
                    }}
                >
                    {operationIcon && icons.AngleLeft}
                    {operations[1]}
                </Button>
            </div>
        </div>
    )
}

export default memo(OperationButtons)
