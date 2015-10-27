var webpack = require('webpack');

module.exports = {
  entry: './src/datepicker',
  output: {
    libraryTarget: 'umd',
    library: 'DatePicker',
    path: './dist/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: [
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'moment': {
        root: 'moment',
        commonjs2: 'moment',
        commonjs: 'moment',
        amd: 'moment'
      }
    },
    {
      'react-onclickoutside': {
        root: 'OnClickOutside',
        commonjs2: 'react-onclickoutside',
        commonjs: 'react-onclickoutside',
        amd: 'react-onclickoutside'
      }
    },
    {
      'tether': {
        root: 'Tether',
        commonjs2: 'tether',
        commonjs: 'tether',
        amd: 'tether'
      }
    },
    {
      'lodash': {
        root: '_',
        commonjs2: 'lodash',
        commonjs: 'lodash',
        amd: 'lodash'
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
