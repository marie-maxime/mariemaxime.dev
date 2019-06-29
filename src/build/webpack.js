
const { env: envName } = utils.detectEnv();

const devTool = envName === 'prod' ? 
{
  mode: envName,
  cache: false,
  bail: false,
  watch: false,
  devtool: false,
} : {
  devtool: 'inline-source-map',
  mode: envName,
  cache: true,
  bail: false,
  watch: true,
  devtool: 'source-map',
}

module.exports = {
  entry: require('./webpack/entry'),
  output: require('./webpack/output'),
  resolve: require('./webpack/resolve'),
  rules: require('./webpack/rules'),
  plugins: require('./webpack/plugins'),
  optimization: require('./webpack/optimization'),
  ...devTool
}