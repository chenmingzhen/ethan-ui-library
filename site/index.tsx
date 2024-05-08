import React from 'react'
import ReactDOM from 'react-dom'
import '../src/styles/normalize.less'
import './styles/index.less'
import 'prismjs/themes/prism.css'
import theme from './utils/theme'

import App from './App'

theme.init(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})
