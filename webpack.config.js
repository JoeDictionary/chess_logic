const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENTRY = './src/chess.ts';
const OUT = './dist';

clientConfig = (env) => {
  console.log('NODE_ENV:', env.NODE_ENV);

  return {
    // watch: true, // For developing with server (NOT dev-server)
    name: 'clientConfig',
    devServer: {
      contentBase: path.resolve(__dirname, OUT),
      compress: true,
      port: 8080,
      open: true,
    },
    mode: env.NODE_ENV,
    devtool: 'source-map',
    entry: {
      chess: path.resolve(__dirname, ENTRY),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, OUT),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['ts-loader'],
          include: [path.resolve(__dirname, ENTRY)],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'TEST Title',
      }),
    ],
  };
};

module.exports = [clientConfig];
