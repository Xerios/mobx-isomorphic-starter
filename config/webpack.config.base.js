const webpack = require('webpack')
const path = require('path')
const ExtractCSS = require('extract-text-webpack-plugin')

// Define client source path
const sources = path.join(__dirname, '../src/client')

// Default config
const config = {
    entry: './index.js',
    target: 'web',
    context: sources,
    node: {
        global: true,
        fs: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: sources,
                babelrc: false,
                query: {
                    cacheDirectory: true,
                    plugins: [
                        "transform-decorators-legacy", // Required for @connect and other decorators
                        "transform-class-properties", // Required for class props ( ex: see childContextTypes in Context.jsx )
                        "add-module-exports", // A way to get rid of insanity of require('xx').default
                        // ES2015 stuff ---
                        "transform-es2015-modules-commonjs",
                        "transform-es2015-arrow-functions",
                        "transform-es2015-block-scoping",
                        "transform-es2015-block-scoped-functions",
                        "transform-es2015-classes",
                        "transform-es2015-computed-properties",
                        "transform-es2015-destructuring",
                        "transform-es2015-literals",
                        "transform-es2015-template-literals",
                        "transform-es2015-parameters",
                        "transform-es2015-shorthand-properties",
                        "transform-es2015-spread",
                        // React ---
                        "transform-react-jsx",
                    ]
                }
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                loader: ExtractCSS.extract(['css', 'sass']),
                include: path.join(sources, 'assets')
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
