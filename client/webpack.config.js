const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // TODO: Add an instance of HtmlWebpackPlugin for your main HTML file
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      
      // TODO: Add an instance of HtmlWebpackPlugin for your install HTML file
      new HtmlWebpackPlugin({
        template: './src/install.html',
        filename: 'install.html',
        chunks: ['install'],
      }),
      
      // TODO: Configure WebpackPwaManifest to generate your app's manifest file
      new WebpackPwaManifest({
        name: 'Your PWA Name',
        short_name: 'PWA',
        description: 'Your PWA Description',
        background_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
      }),
      
      // TODO: Configure InjectManifest to work with your service worker
      new InjectManifest({
        swSrc: './src/service-worker.js',
        swDest: 'service-worker.js',
      }),
    ],
    module: {
      rules: [
        // TODO: Add CSS loaders here
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // TODO: Add Babel loader for JavaScript transpilation
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
