const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const path = require('path');
const glob = require('glob-all');
const env = process.env.NODE_ENV || 'development';

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

const prodPlugins = [
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: 'localhost:8000',
    files: [
      path.resolve(__dirname, "../../../views/**/*.pug"),
      path.resolve(__dirname, "../../../src/**/*.ts"),
      path.resolve(__dirname, "../../../src/**/*.scss"),
    ],
  }),

  new ImageminPlugin({
    optipng: {
      optimizationLevel: 7,
    },
    gifsicle: {
      optimizationLevel: 3,
    },
    svgo: {
      plugins: [
        { cleanupAttrs: true },
        { removeDoctype: true },
        { removeXMLProcInst: true },
        { removeComments: true },
        { removeMetadata: true },
        { removeUselessDefs: true },
        { removeEditorsNSData: true },
        { removeEmptyAttrs: true },
        { removeHiddenElems: false },
        { removeEmptyText: true },
        { removeEmptyContainers: true },
        { cleanupEnableBackground: true },
        { removeViewBox: true },
        { cleanupIDs: false },
        { convertStyleToAttrs: true },
      ]
    },
    plugins: [
      require('imagemin-mozjpeg')({
        quality: 100,
      }),
    ],
  }),
]

const defaultPlugins = [
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

  
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: env === 'production' ? 'css/styles.[contenthash:8].css' : 'css/styles.css',
    chunkFilename: env === 'production' ? 'css/[id].[contenthash:8].css' : 'css/[id].css',
  }),

  new CleanWebpackPlugin('dist', {
    root: path.resolve(__dirname, "../../..")
  }),

  new ManifestPlugin(),
]

const plugins = env === 'production' ? defaultPlugins : [...defaultPlugins, ...prodPlugins];
console.log(env);
module.exports = [
  ...plugins
];