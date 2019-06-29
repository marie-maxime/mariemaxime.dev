
const env = process.env.NODE_ENV || 'development';

const devTool = env === 'production' ? 
{
  mode: env,
  cache: false,
  bail: false,
  watch: false,
  devtool: false,
} : {
  devtool: 'inline-source-map',
  mode: env,
  cache: true,
  bail: false,
  watch: true,
  devtool: 'source-map',
}

module.exports = {
  entry: require('./webpack/entry'),
  output: require('./webpack/output'),
  resolve: require('./webpack/resolve'),
  module: require('./webpack/rules'),
  plugins: require('./webpack/plugins'),
  optimization: require('./webpack/optimization'),
  ...devTool
}