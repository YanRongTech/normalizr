const path = require('path'),
    webpack = require('webpack');


module.exports = {
        entry: {
            'normalizr': './index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: "[name].js",
            libraryTarget: 'commonjs'
        },
        externals: {
            lodash: {
                commonjs: 'lodash',
                amd: 'lodash'
            },
            "util-toolkit": 'util-toolkit'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
};
