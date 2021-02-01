import React, { useCallback, useRef, memo } from 'react'
import PropTypes from 'prop-types'

const inputStyle = { display: 'none' }

const FileInput = props => {
  const inputRef = useRef()
  const locked = useRef(false)

  const click = useCallback(() => {
    if (locked.current) return
    locked.current = true

    inputRef.current.value = ''
    inputRef.current.click()

    setTimeout(() => {
      locked.current = false
    }, 1000)
  }, [inputRef.current, locked.current])

  const { accept, onChange, multiple, webkitdirectory } = props

  return (
    <input
      ref={inputRef}
      accept={accept}
      multiple={multiple}
      onChange={onChange}
      style={inputStyle}
      // for chrome
      webkitdirectory={webkitdirectory}
      type="file"
    />
  )
}

FileInput.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  webkitdirectory: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default memo(FileInput)
