const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: './src/main/main.ts',
    preload: './src/main/preload.ts'
  },
  target: 'electron-main',
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(packageJson.version),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: {
    path: 'commonjs path',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};
