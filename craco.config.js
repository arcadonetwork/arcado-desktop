const CracoLessPlugin = require('craco-less');
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            relativeUrls: false,
            modifyVars: {
              '@primary-color': '#f74603',
              '@primary-color-xl': '#ffe3d9',
              'border-radius-base': '3px'
            },
            javascriptEnabled: true,
          }
        }
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ tsImportPluginFactory( /** options */) ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};
