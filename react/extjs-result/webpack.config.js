const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require('path');

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].bundle.js',
        chunkFilename: "../dist/[name].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"]
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "ext",
            library: { type: "var", name: "ext" },
            remotes: {
                app1: "app1",
            },
            shared: ["react", "react-dom"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ]
};
