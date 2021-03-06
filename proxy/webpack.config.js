const path = require('path');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: [
    // "../somebirdsColorAndSizeSelection/client/index.jsx",
    "../../somebirds-product-accordion/client/index.jsx",
    // "../somebirds-product-images/client/index.jsx",
    // "../somebirdsReviews/client/index.jsx",
    // "../somebirdsNavBar/client/index.jsx",
    // "../somebirdsFooter/client/index.jsx"
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      }
    ]
  },
  output: {
    path: DIST_DIR,
    filename: 'bundles.js'
  }
}