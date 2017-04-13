// const debug = process.env.NODE_ENV !== "production";
// console.log("debug" + debug);
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/static/scripts/main.js',
        vendor: ['react','react-dom', 'react-redux', 'redux']
    },
    output: {
        publicPath: '/dist',
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/scripts/bundle.[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader?',
                query: {
                    limit: 10000,
                    name: 'static/font/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', 'scss', '.jsx', '.css'],
        alias: {
            'components': path.resolve(__dirname, 'src/components')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: 'vendor',
            filename: 'static/scripts/vendor.[hash].js'
        }),
        // new uglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
        new HtmlWebpackPlugin({
            title: '1Webpack-demos',
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
}