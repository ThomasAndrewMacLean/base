/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    // Change to your "entry-point".
    entry: './src/script/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [
        new CopyPlugin([
            {
                from: 'src/assets',
                to: 'assets',
            },
        ]),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new GenerateSW({
            skipWaiting: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.pug$/,
                use: ['pug-loader'],
            },
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
