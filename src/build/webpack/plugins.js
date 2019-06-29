const { ProvidePlugin, WatchIgnorePlugin } = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const glob = require('glob-all');
const path = require('path');


class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

module.exports = [

  new PurgecssPlugin({
    paths: glob.sync([
      'app/**/*.php',
      'resources/views/**/*.php',
      'resources/assets/scripts/**/*.js',
    ]),
    whitelist: [ // Only if you need it!
      'is-animating',
      'transition-fade'
    ],
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ["ts", 'html']
      }
    ],
  }),

  new CleanWebpackPlugin(utils.distPath(), {
    root: utils.themeRootPath(),
  }),
  new WatchIgnorePlugin([
    utils.distImagesPath('sprite.png'),
    utils.distImagesPath('sprite@2x.png'),
  ]),
  extractSass,
  spriteSmith,
  browsersync,

  new RemovePlugin({
    after: {
      test: [
        {
          folder: utils.distPath() + '/js',
          method: (filePath) => {
            return new RegExp(/^style.*$/).test(filePath);
          },
          recursive: true
        }
      ]
    }
  }),

  new ManifestPlugin(),
];