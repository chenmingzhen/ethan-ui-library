const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: {
        main: "./src/index.js",
    },
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    compilerOptions: {
                        declaration: false,
                    },
                },
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./public/index.html"}),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {"@": path.resolve(__dirname, "../src")}
    }
};
