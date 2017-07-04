var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var path = require('path');
const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV!=='production';

module.exports = {
    // context: path.resolve(__dirname, "demo"),
    entry: './demo/index.js',

    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/',
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.less'],
        modules: [
            path.resolve(__dirname, "lib"),
            path.resolve(__dirname, "node_modules"),
            'node_modules'
        ],
        alias: {
            components: path.resolve(__dirname, "src/components"),    // used for tests
            style: path.resolve(__dirname, "src/style"),
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [path.resolve(__dirname, 'src'),path.resolve(__dirname, 'demo')],
                enforce: 'pre',
                use: 'source-map-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                // Transform our own .(less|css) files with PostCSS and CSS-modules
                test: /\.(less|css)$/,
                include: [path.resolve(__dirname, 'src/components')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { modules: true, sourceMap: CSS_MAPS, importLoaders: 1 }
                        },
                        {
                            loader: `postcss-loader`,
                            options: {
                                sourceMap: CSS_MAPS,
                                plugins: () => {
                                    autoprefixer({ browsers: [ 'last 2 versions' ] });
                                }
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: { sourceMap: CSS_MAPS }
                        }
                    ]
                })
            },
            {
                test: /\.(less|css)$/,
                exclude: [path.resolve(__dirname, 'src/components')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: CSS_MAPS, importLoaders: 1 }
                        },
                        {
                            loader: `postcss-loader`,
                            options: {
                                sourceMap: CSS_MAPS,
                                plugins: () => {
                                    autoprefixer({ browsers: [ 'last 2 versions' ] });
                                }
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: { sourceMap: CSS_MAPS }
                        }
                    ]
                })
            },
            {
                test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
                use: ENV==='production' ? 'file-loader' : 'url-loader'
            }
        ]
    },
    plugins: ([
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true,
            disable: ENV !== 'production'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV)
        }),
        new HtmlWebpackPlugin({
            template: './demo/index.ejs',
            minify: { collapseWhitespace: true }
        })
    ]),

    stats: { colors: true },

    node: {
        global: true,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
        setImmediate: false
    },

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        port: process.env.PORT || 8080,
        host: 'localhost',
        publicPath: '/',
        contentBase: './demo',
        historyApiFallback: true,
        open: true,
        proxy: {
            // OPTIONAL: proxy configuration:
            // '/optional-prefix/**': { // path pattern to rewrite
            //   target: 'http://target-host.com',
            //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
            // }
        }
    }
};