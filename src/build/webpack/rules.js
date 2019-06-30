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
      test: /\.s(a|c)ss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: false,
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
            name: file => `assets/[name].[ext]`,
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
            name: file => `assets/[name].[ext]`,
          },
        },
      ],
    },

  ]
}


