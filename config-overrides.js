const {
  fixBabelImports,
  addLessLoader,
  override,
  addWebpackPlugin
} = require('customize-cra');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = override(
  addWebpackPlugin(
    new CompressionPlugin(
      Object.assign({
        algorithm: 'gzip'
      })
    )
  ),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    importLoaders: true,
    modifyVars: {
    }
  })
);
