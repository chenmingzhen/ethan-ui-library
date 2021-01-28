import React, { useState, useCallback, memo, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { transferClass } from '@/styles'
import { getKey } from '@/utils/uid'
import { createFunc } from '@/utils/func'
import { isFunc } from '@/utils/is'
import { getLocale } from '@/locale'
import LazyList from '../List/LazyList'
import Spin from '../Spin'
import filter from './filter'
import SCard from '../Card'
import Checkbox from '../Checkbox'
import Item from './item'
import Input from '../Input'

const Card = props => {
  const [lh, setLh] = useState(props.listHeight)
  const [mounted, setMounted] = useState(false)
  const cardBody = useRef()
  const {
    title,
    data,
    selecteds,
    footer,
    listClassName,
    listStyle,
    empty,
    disabled,
    loading,
    listHeight,
    customRender,
    keygen,
    index,
    setSelecteds,
    onFilter,
    onSearch,
    renderFilter,
    filterText,
    values,
    lineHeight,
    rowsInView,
    renderItem,
  } = props

  // --------------------------method and computed-----------------
  const check = useMemo(() => {
    if (selecteds.length === 0) return false

    if (selecteds.length === data.length) return true

    return 'indeterminate'
  }, [selecteds, data])

  const listms = useMemo(() => Object.assign({}, listStyle, { height: listHeight }), [listStyle, listHeight])

  const checkAll = useCallback(
    c => {
      if (c) {
        if (typeof disabled === 'function')
          setSelecteds(
            index,
            data.reduce((r, d, i) => {
              if (disabled(d)) return r
              r.push(getKey(d, keygen, i))
              return r
            }, [])
          )
        else
          setSelecteds(
            index,
            data.map((d, i) => getKey(d, keygen, i))
          )
      } else {
        setSelecteds(index, [])
      }
    },
    [keygen, index, setSelecteds, data]
  )

  // eslint-disable-next-line no-underscore-dangle
  const _renderFilter = useCallback(() => {
    if (!onFilter && !onSearch) return null
    if (renderFilter && typeof renderFilter === 'function') {
      return (
        <div className={transferClass('filter')}>
          {renderFilter({
            value: filterText,
            disabled: disabled === true,
            onFilter,
            placeholder: getLocale('search'),
          })}
        </div>
      )
    }
    return (
      <div className={transferClass('filter')}>
        <Input
          disabled={disabled === true}
          onChange={onFilter}
          placeholder={getLocale('search')}
          clearable
          size="small"
          value={filterText}
        />
      </div>
    )
  }, [onFilter, onSearch, renderFilter, filterText, disabled])

  const bindCardBody = useCallback(
    node => {
      cardBody.current = node
      setMounted(true)
      setLh(node ? node.offsetHeight : listHeight)
    },
    [listHeight, cardBody.current]
  )

  const customSetSelected = useCallback(
    value => {
      if (typeof value === 'string') {
        setSelecteds(index, [...selecteds, value])
        return
      }
      if (Array.isArray(value)) {
        setSelecteds(index, value)
      }
    },
    [index, setSelecteds, selecteds]
  )
  const handleRenderItem = useCallback(
    (d, i) => {
      const disable = disabled === true
      const key = getKey(d, keygen, i)

      return (
        <Item
          lineHeight={lineHeight}
          key={key}
          disabled={disable || (typeof disabled === 'function' && disabled(d))}
          index={index}
          checkKey={key}
          liData={d}
          content={createFunc(renderItem)(d)}
        />
      )
    },
    [keygen, index, renderItem, disabled, lineHeight]
  )

  const renderLazyList = useCallback(() => {
    if (!mounted) return null
    return (
      <LazyList
        stay={!filterText}
        data={data}
        itemsInView={rowsInView}
        lineHeight={lineHeight}
        height={lh}
        scrollHeight={lineHeight * data.length}
        renderItem={handleRenderItem}
      />
    )
  }, [filterText, data, rowsInView, lh, rowsInView, handleRenderItem, lineHeight])

  const renderBody = useCallback(() => {
    if (isFunc(customRender)) {
      const custom = customRender({
        onSelected: customSetSelected,
        direction: index === 0 ? 'left' : 'right',
        selectedKeys: props.selecteds,
        value: values,
      })
      if (custom) return custom
    }

    return renderLazyList()
  }, [customRender, props.selecteds, values, customSetSelected, index, renderLazyList])
  // ---------------------------render------------------------------
  const disable = disabled === true

  return (
    <SCard className={transferClass('card')}>
      <SCard.Header className={transferClass('card-header')}>
        <div>
          <Checkbox onChange={checkAll} checked={check} disabled={disable}>
            {check ? `${selecteds.length} ${getLocale('selected')}` : getLocale('selectAll')}
          </Checkbox>
        </div>
        <div className={transferClass('card-header-title')}>{title}</div>
      </SCard.Header>
      {_renderFilter()}
      <Spin loading={loading}>
        <SCard.Body className={classnames(transferClass('card-body'), listClassName)} style={listms}>
          <div className={transferClass('body-container')} ref={bindCardBody}>
            {renderBody()}
            {!isFunc(customRender) && data.length === 0 && (
              <div className={transferClass('empty')}>{empty || getLocale('noData')}</div>
            )}
          </div>
        </SCard.Body>
      </Spin>

      {footer && <SCard.Footer className={transferClass('card-footer')}>{footer}</SCard.Footer>}
    </SCard>
  )
}

Card.propTypes = {
  selecteds: PropTypes.array,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  data: PropTypes.array,
  setSelecteds: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  index: PropTypes.number,
  footer: PropTypes.object,
  listClassName: PropTypes.string,
  listStyle: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onFilter: PropTypes.func,
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  rowsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  listHeight: PropTypes.number,
  filterText: PropTypes.string,
  renderFilter: PropTypes.func,
  customRender: PropTypes.func,
  values: PropTypes.array,
}

export default filter(memo(Card))
