import React from 'react'
import ReactDOM from 'react-dom'
import theme from './utils/theme'

import App from './App'

theme.init(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})
