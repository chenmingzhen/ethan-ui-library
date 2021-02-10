import React from 'react'
import { getLocale } from 'ethan/locale'

export default function() {
  return <pre>{JSON.stringify(getLocale(), null, 2)}</pre>
}
