module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "dist/Angel.min.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};