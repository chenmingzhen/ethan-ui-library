import React, { useState, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { transferClass } from '@/styles'
import Btns from './btns'
import Card from './Card'
import { Provider } from './context'
import splitSelecteds from './utils/select'

const Transfer = props => {
  const {
    titles,
    data,
    datum,
    keygen,
    renderItem,
    footers,
    operations,
    operationIcon,
    className,
    style,
    listClassName,
    listStyle,
    onFilter,
    onSearch,
    empty,
    disabled,
    itemClass,
    rowsInView,
    lineHeight,
    listHeight,
    renderFilter,
    children,
    selectedKeys,
    defaultSelectedKeys,
    onSelectChange,
    loading,
  } = props

  const [selecteds, setSelecteds] = useState(() =>
    selectedKeys ? splitSelecteds(selectedKeys, props) : splitSelecteds(defaultSelectedKeys, props) || [[], []]
  )

  // eslint-disable-next-line no-underscore-dangle
  const _setSelecteds = useCallback(
    (index, value) => {
      const newSelecteds = index ? [selecteds[0], value] : [value, selecteds[1]]

      if (onSelectChange) onSelectChange(newSelecteds[0], newSelecteds[1])

      setSelecteds(newSelecteds)
    },
    [onSelectChange, selecteds]
  )

  const getLoading = useCallback(
    index => {
      if (Array.isArray(loading)) return loading[index]
      return loading
    },
    [loading]
  )
  const getSelected = useCallback(() => {
    if ('selectedKeys' in props) return splitSelecteds(props.selectedKeys, props)
    return selecteds
  }, [selectedKeys, props, selecteds])

  // ------------------------------------render------------------------
  // eslint-disable-next-line no-underscore-dangle
  const _selecteds = getSelected()
  const datumValues = datum.getValue()
  if ('value' in props && datumValues !== props.value) {
    props.datum.setValue(props.value)
  }
  const sources = data.filter(d => !datum.check(d))
  const targets = datumValues.reduce((p, n) => {
    const d = datum.getDataByValue(data, n)
    if (d) p.push(d)
    return p
  }, [])

  return (
    <div className={classnames(transferClass('_'), className)} style={style}>
      <Provider value={{ selecteds: _selecteds, setSelecteds: _setSelecteds, itemClass }}>
        <Card
          title={titles[0]}
          selecteds={_selecteds[0]}
          data={sources}
          keygen={keygen}
          renderItem={renderItem}
          setSelecteds={_setSelecteds}
          index={0}
          footer={footers[0]}
          listClassName={listClassName}
          listStyle={listStyle}
          loading={getLoading(0)}
          onFilter={onFilter}
          empty={empty}
          disabled={disabled}
          onSearch={onSearch}
          rowsInView={rowsInView}
          lineHeight={lineHeight}
          listHeight={listHeight}
          renderFilter={renderFilter}
          customRender={children}
          values={datumValues}
        />
        <Btns
          selecteds={_selecteds}
          datum={datum}
          setSelecteds={_setSelecteds}
          keygen={keygen}
          sources={sources}
          targets={targets}
          operations={operations}
          operationIcon={operationIcon}
          data={data}
          disabled={disabled}
        />
        <Card
          title={titles[1]}
          selecteds={_selecteds[1]}
          data={targets}
          keygen={keygen}
          renderItem={renderItem}
          loading={getLoading(1)}
          setSelecteds={_setSelecteds}
          index={1}
          footer={footers[1]}
          listClassName={listClassName}
          listStyle={listStyle}
          onFilter={onFilter}
          empty={empty}
          disabled={disabled}
          onSearch={onSearch}
          rowsInView={rowsInView}
          lineHeight={lineHeight}
          listHeight={listHeight}
          renderFilter={renderFilter}
          customRender={children}
          values={datumValues}
        />
      </Provider>
    </div>
  )
}

Transfer.defaultProps = {
  titles: [],
  data: [],
  footers: [],
  operations: [],
  operationIcon: true,
  renderItem: d => d,
  rowsInView: 20,
  lineHeight: 32,
  listHeight: 180,
}

Transfer.propTypes = {
  titles: PropTypes.array,
  data: PropTypes.array,
  datum: PropTypes.object,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  footers: PropTypes.array,
  operations: PropTypes.array,
  operationIcon: PropTypes.bool,
  value: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
  listClassName: PropTypes.string,
  listStyle: PropTypes.object,
  selectedKeys: PropTypes.array,
  defaultSelectedKeys: PropTypes.array,
  onSelectChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onFilter: PropTypes.func,
  itemClass: PropTypes.string,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onSearch: PropTypes.func,
  rowsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  listHeight: PropTypes.number,
  renderFilter: PropTypes.func,
  children: PropTypes.func,
}

export default memo(Transfer)
