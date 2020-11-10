const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const compiler = webpack({
  entry: {
    app: './src/app'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // try to comment line below and you'll see bug doesn't appear
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
})

compiler.hooks.beforeCompile.tap('log build process', () => {
  console.log('Compiling...')
})

compiler.hooks.afterCompile.tap('log build process', () => {
  console.log('Compiled')
})

compiler.run((err, __stats__) => {
  if (err) {
    console.log(chalk.red(err))
    return
  }

  const stats = __stats__.toJson()

  if (stats.errors.length) {
    const error = chalk.red
    console.log(error('Errors:'))
    console.log(...stats.errors.map(e => error(e)))
  }
  if (stats.warnings.length) {
    const warning = chalk.hex('#ffae42')
    console.log(warning('Warnings:'))
    console.log(...stats.warnings.map(w => warning(w)))
  }
})
