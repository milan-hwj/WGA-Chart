var webpack = require('webpack');
module.exports = {
    entry: "./main.js",
    output: {
        path: __dirname,
        filename: "./main.min.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
