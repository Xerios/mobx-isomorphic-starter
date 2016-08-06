const _ = require('lodash')
const webpack = require('webpack')
const config = require('./webpack.config.base.js')

// Merge with base configuration
//-------------------------------
_.merge(config, {
    cache: false
})

delete config.output.libraryTarget
delete config.output.pathinfo

// Save files to disk
//-------------------------------
config.plugins.push(
new webpack.DefinePlugin({
    'process.env.BLUEBIRD_WARNINGS': '0',
    'process.env.NODE_ENV': JSON.stringify('production')
}),
new webpack.optimize.OccurrenceOrderPlugin(),
new webpack.optimize.DedupePlugin(),
new webpack.optimize.UglifyJsPlugin({
    compressor: {
        screw_ie8: true,
        warnings: false
    }
})
)

// Sanity checks
//-------------------------------
if (config.devtool === 'eval') {
    throw new Error('webpack: using "eval" source-maps may break the build')
}

// Compile everything for PROD
//-------------------------------
console.info('webpack: running production build...')

const compiler = webpack(config)
compiler.run(function(err, stats) {
    if (err) throw err

    // Output stats
    console.log(stats.toString({
        colors: true,
        hash: false,
        chunks: false,
        version: false,
        chunkModules: false
    }))

    if (stats.hasErrors()) {
        console.warn('webpack: finished compiling webpack with errors...')
        console.warn(stats.compilation.errors.toString())
    } else {
        console.info('webpack: finished compiling webpack')
    }
})

module.exports = config
