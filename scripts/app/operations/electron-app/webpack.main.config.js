const path = require('path');

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
