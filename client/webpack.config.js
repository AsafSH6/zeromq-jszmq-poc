const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT ?? 9000
const devWebsocketPort = process.env.DEV_WEBSOCKET_PORT || port
const src = path.resolve(__dirname, 'src')
const distPath = path.resolve(__dirname, 'dist')

module.exports = {
    mode: process.env.MODE || 'development',
    entry: [path.resolve(src, 'index.ts')],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(src, 'index.html'),
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: distPath,
        publicPath: '/'
    },
    devServer: {
        static: {
            directory: distPath,
            publicPath: '/'
        },
        port: port,
        host: '0.0.0.0',
        hot: true,
        client: {
            webSocketURL: `ws://0.0.0.0:${devWebsocketPort}/ws`,
        }
    },
};