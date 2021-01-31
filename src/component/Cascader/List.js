import React, { useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { getLocale } from '@/locale'
import { cascaderClass } from '@/styles'
import Node from './Node'

const List = props => {
  const getKey = useCallback(
    (data, index) => {
      const { keygen, parentId } = props

      if (typeof keygen === 'function') return keygen(data, parentId)
      if (keygen) return data[keygen]

      return parentId + (parentId ? ',' : '') + index
    },
    [props.keygen, props.parentId]
  )

  const getText = useCallback(key => props.text[key] || getLocale(key), [props.text])

  const { data, ...other } = props

  if (!data || data.length === 0) return <span className={cascaderClass('no-data')}>{getText('noData')}</span>

  return (
    <div className={cascaderClass('list')}>
      {data.map((d, i) => {
        const id = getKey(d, i)
        return <Node {...other} key={id} active={other.id === id} id={id} data={d} />
      })}
    </div>
  )
}

List.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  keygen: PropTypes.any,
  onNodeClick: PropTypes.func,
  parentId: PropTypes.string,
  text: PropTypes.object,
}

List.defaultProps = {
  id: '',
  parentId: '',
  text: {},
}

export default memo(List)
