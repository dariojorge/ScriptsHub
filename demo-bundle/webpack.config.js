const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const bundleName = "bundle";

module.exports = {
    entry: './src/index.ts', // Entry point
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'], // So Webpack knows to handle both .ts and .js
    },
    output: {
        filename: `${bundleName}.js`, // Output bundle name
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development', // Change to 'production' for minification etc.
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
            generateStatsFile: true,
            statsFilename: `${bundleName}Stats.json`
        })
    ]
};