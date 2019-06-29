const path = require('path');
const env = process.env.NODE_ENV || 'development';
const filename = env === 'production' ? 'js/[name].[contenthash:8].js' : 'js/[name].js';

module.exports = {
  path: path.resolve(__dirname, "../../../dist/"),
  filename
};