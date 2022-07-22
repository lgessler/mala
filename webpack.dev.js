const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const path = require('path')
const fs = require('fs')

function dataToPlugin(data) {
  data.icon = data.icon || "default.png"
  data.screenshot = data.screenshot || "default.png"
  return new HtmlWebpackPlugin({
    template: './src/page-app/tmpl.html',
    inject: true,
    chunks: ["app"],
    filename: `${data.slug}.html`,
    templateParameters: data,
  })
}
function readData() {
  const dataDir = path.resolve(process.cwd(), 'src', 'data')
  const paths = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !f.endsWith("_template.json"))
  const jsons = paths.map(fname => JSON.parse(fs.readFileSync(path.resolve(dataDir, fname), {encoding: "utf-8"})))
  return jsons
}
const jsons = readData()
const plugins = jsons.map(d => dataToPlugin(d))

module.exports = {

  // https://webpack.js.org/configuration/mode/
  mode: 'development',

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/page-index/main.js',
    about: './src/page-about/main.js',
    app: './src/page-app/main.js',
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    devMiddleware: {
      writeToDisk: false // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
    }
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        // https://webpack.js.org/loaders/babel-loader/#root
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {"useBuiltIns": "usage", "corejs": 3, "targets": "> 0.25%, not dead"}],
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        // https://webpack.js.org/loaders/css-loader/#root
        test: /\.css$|\.scss/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        // https://webpack.js.org/guides/asset-modules/#resource-assets
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name][ext][query]'
        }
      },
      {
        // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        // https://webpack.js.org/loaders/html-loader/#usage
        resourceQuery: /template/,
        loader: 'html-loader'
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new webpack.DefinePlugin({
      APPS: JSON.stringify(jsons)
    }),
    new HtmlWebpackPlugin({
      template: './src/page-index/tmpl.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-about/tmpl.html',
      inject: true,
      chunks: ['about'],
      filename: 'about.html'
    }),
    ...plugins
  ]
}
