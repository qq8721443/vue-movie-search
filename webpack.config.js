const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');

module.exports ={
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    },
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.s?css/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `
                                @import "~/scss/_variables.scss";
                            `
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "static"
                }
            ]
        })
    ],
    devServer: {
        port: 8079,
        historyApiFallback: true
    }
}
