const request = require('request')
const Koa = require('koa')
const send = require('koa-send')
const Router = require('koa-router')
const multer = require('koa-multer')
const fs = require('fs')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack/config.dev')
const config = require('./config')
const { version } = require('./package.json')

// webpack server ===========================================

new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  quiet: false,
  // noInfo: true,
  stats: {
    colors: true,
    // children: false,
  },
}).listen(config.dev.webpackPort, 'localhost', (err) => {
  if (err) {
    console.log(err)
  }
})
