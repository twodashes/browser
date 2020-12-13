/*
 * NOT CURRENTLY USED
   Dependencies:
    "@babel/core": "^7.12.9",
    "@babel/preset-env": "^7.12.7",
    "babel-loader": "^8.2.2",
    "webpack": "^5.10.0",
    "webpack-cli": "^4.2.0",
   NPM script:
    "webpack": "webpack --config webpack.config.cjs"
 */

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'browser'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": ">0.25%"
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
