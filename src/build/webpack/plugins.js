const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const glob = require('glob-all');


class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

module.exports = [

  new PurgecssPlugin({
    paths: glob.sync([
      'src/scripts/**/*.ts',
      'views/**/*.pug',
    ]),
    whitelist: [],
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ["ts", 'html', 'pug']
      }
    ],
  }),

  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: 'localhost:8000',
  }),

  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'css/styles.[contenthash:8].css',
    chunkFilename: 'css/[id].[contenthash:8].css',
  }),

  new CleanWebpackPlugin('dist', {
    root: path.resolve(__dirname, "../../..")
  }),

  new ManifestPlugin(),
];