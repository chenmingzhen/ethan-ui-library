import { useEffect, useCallback, useState, useMemo } from 'react'

import locate from '../utils/locate'

const verReg = /(\d+\.){2}x/

const useVersion = () => {
  const [versions, setVersions] = useState([])

  const version = useMemo(() => {
    const find = versions.find(v => window.location.pathname.indexOf(v.content) >= 0)

    if (find) return find.content

    return find
  }, [versions])

  const transformVersionUrl = useCallback((v, language) => {
    const preUrl = window.location.href.split(verReg)[0]

    return `${preUrl}${v}/${language}`
  }, [])

  useEffect(() => {
    // ethan-ui-pages/ 目录下 与新增的images同级
    fetch('../../../versions.json')
      .then(ver => ver.json())
      .then(json => {
        const language = locate('cn', 'en')

        const jsonVersions = json.map(v => ({
          content: v,
          url: transformVersionUrl(v, language),
        }))

        setVersions(jsonVersions)
      })
  }, [])

  return [version, versions]
}

export default useVersion
