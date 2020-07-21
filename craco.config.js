const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            '@primary-color': '#f74603',
            '@primary-color-xl': '#ffe3d9',
            'border-radius-base': '3px'
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
};
