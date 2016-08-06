const _ = require('lodash')
const webpack = require('webpack')
const config = require('./webpack.config.base.js')

// Use port ( if you change this adapt code in Html.jsx as well )
const dev_port = 8080

// Merge with base configuration
//-------------------------------
_.merge(config, {
    cache: true,
    devtool: 'source-map',
    entry: {
        bundle: [
            //'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080/',
            config.entry
        ]
    }
})

// Setup webpack for DEV
//-------------------------------
const compiler = webpack(config)
const compilerConfig = {
    contentBase: 'build',
    filename: 'bundle.js',
    compress: true,
    watchOptions: {
        poll: true,
        aggregateTimeout: 500,
        ignore: /node_modules|data|build|\.git/
    },
    stats: {
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
}

// Launch DEV server
//-------------------------------
console.info('webpack: running dev build...')

const WebpackDevServer = require('webpack-dev-server')
const server = new WebpackDevServer(compiler, compilerConfig)
server.listen(dev_port, function() {
    console.info(`webpack: dev server running on port ${dev_port}`)
})


module.exports = config
