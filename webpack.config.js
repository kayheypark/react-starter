const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const config = {
        entry: path.join(__dirname, 'src', 'index.tsx'),
        mode: options.mode,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[hash].js',
        },
        module: {
            rules: [
                {
                    test: /\.?(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                    resolve: {
                        extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    use: ['file-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'public', 'index.html'),
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProvidePlugin({
                React: 'react',
            }),
        ],
        devServer: {
            hot: true,
            host: 'localhost',
            port: 3000,
            open: true,
        },
    };
    return config;
};
