// @ts-nocheck
import React, { memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { getKey } from '@/utils/uid'
import { transferClass } from '@/styles'
import Button from '../Button'
import icons from '../icons'

const Btns = props => {
    const { setSelecteds, selecteds, datum, data, keygen, operations, operationIcon, disabled } = props

    const change = useCallback(
        index => {
            const newValue = selecteds[1 - index].map(c => data.find((d, i) => getKey(d, keygen, i) === c))

            setSelecteds(1 - index, [])

            datum[index ? 'add' : 'remove'](newValue, undefined, undefined, true)
        },
        [datum, selecteds, setSelecteds, data, keygen]
    )

    const toSource = useMemo(() => change.bind(null, 0), [change])
    const toTarget = useMemo(() => change.bind(null, 1), [change])

    // ----------------------------------render--------------------------------
    const disable = disabled === true

    return (
        <div className={transferClass('btns')}>
            <div>
                <Button
                    type="primary"
                    disabled={disable || !selecteds[0].length}
                    size="small"
                    className={transferClass('btns-button', 'btns-bottom')}
                    onClick={toTarget}
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
                    onClick={toSource}
                >
                    {operationIcon && icons.AngleLeft}
                    {operations[1]}
                </Button>
            </div>
        </div>
    )
}

Btns.propTypes = {
    datum: PropTypes.object,
    selecteds: PropTypes.array,
    data: PropTypes.array,
    setSelecteds: PropTypes.func,
    keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    operations: PropTypes.array,
    operationIcon: PropTypes.bool,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
}

export default memo(Btns)
