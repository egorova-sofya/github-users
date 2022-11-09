const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: './src/index.tsx',
    sw: './src/service.worker.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /service\.worker\.ts$/i,
        use: 'ts-loader',
        type: 'asset/resource',
        generator: {
          filename: 'sw.js',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|jpg|png)$/,
        type: 'asset/resource',
      },

      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /worker\.ts$/],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      excludeChunks: ['sw'],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    client: {
      overlay: false,
    },
    open: true,
  },
};
