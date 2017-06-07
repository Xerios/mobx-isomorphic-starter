const webpack = require('webpack')
const path = require('path')
const ExtractCSS = require('extract-text-webpack-plugin')

// Define client source path
const sources = (file = '') => path.join(__dirname, '../src/client', file)

// Default config
const config = {
    entry: sources('client.js'),
    target: 'web',
    context: sources(),
    node: {
        global: true,
        fs: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: sources(),
                babelrc: false,
                query: {
                    cacheDirectory: true,
                    plugins: [
                        "add-module-exports",
                        "transform-object-rest-spread",
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        // React ---
                        "transform-react-jsx",
                    ]
                }
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                loader: ExtractCSS.extract(['css', 'sass']),
                include: sources('assets')
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '..', 'public'),
        filename: 'bundle.js',
        publicPath: "/",
    },
    plugins: [
        //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // If you don't need moment's locales
        new ExtractCSS('bundle.css', { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env.IS_CLIENT': true,
        })
    ]
}

module.exports = config
