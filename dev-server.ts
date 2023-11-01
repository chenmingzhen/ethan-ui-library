import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import webpackConfig from './webpack/config.dev'
import initSite from './scripts/dev-site'
import startApp from './app'
import config from './config'

initSite()

/** ----------------------  WebpackDevServer ----------------*/
const webpackDevServer = new WebpackDevServer(
    { port: config.dev.webpackPort, client: { overlay: false } },
    webpack(webpackConfig)
)
webpackDevServer.startCallback(console.error)

/** ----------------------  ProxyServer ----------------*/
startApp()
