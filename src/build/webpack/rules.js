const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcss = require('../postcss.config');

module.exports = {
  rules: [
    /**
     * Add support for blogs in import statements.
     */
    {
      enforce: 'pre',
      test: /\.(js|jsx|css|scss|sass)$/,
      use: 'import-glob',
    },

    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    },

    /**
     * Handle styles.
     */
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: true,
            sourceMap: true,
            importLoader: 2
          }
        },
        {
          loader: 'postcss-loader',
          options: postcss,
        },
        "sass-loader"
      ]
    },

    {
      test: /images[\\/].*\.(ico|jpg|jpeg|png|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: file => `images/[name].${utils.filehash(file).substr(0, 10)}.[ext]`,
          },
        },
      ],
    },

    {
      test: /fonts[\\/].*\.(eot|svg|ttf|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: file => `fonts/[name].${utils.filehash(file).substr(0, 10)}.[ext]`,
          },
        },
      ],
    },

  ]
}


