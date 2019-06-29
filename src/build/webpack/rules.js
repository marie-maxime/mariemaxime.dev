const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        "sass-loader"
      ]
    },
  ]
}


