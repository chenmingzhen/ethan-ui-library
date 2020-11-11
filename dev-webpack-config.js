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
                test: /\.js$/,
                exclude: /node_modules/, //这个文件夹除外
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                "targets": {
                                    "node": "current"
                                }
                            }
                        ],
                        "@babel/preset-react"
                    ]
                }
            },
            // 不知道为什么 上面的 jsx无法识别 单独设置一个来识别
            {
                test: /\.jsx/,
                exclude: /node_modules/, //这个文件夹除外
                loader: "babel-loader",
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
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
        alias: {"@": path.resolve(__dirname, "./src")}
    }
};
