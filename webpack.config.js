var webpack = require('webpack');

module.exports = {
  entry: './src/datepicker',
  output: {
    libraryTarget: 'umd',
    library: 'DatePicker'
  },
  module: {
    loaders: [
      {test: /\.js/, loaders: ['babel-loader'], exclude: /node_modules/}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react/addons': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],
  node: {Buffer: false},
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
