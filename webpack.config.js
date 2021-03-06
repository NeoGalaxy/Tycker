var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/tc.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'tycker.debug.js',
    library: 'Tycker',
    libraryTarget: 'var'
  }
};
