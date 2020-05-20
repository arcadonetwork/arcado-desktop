const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            '@primary-color': '#FF7533',
            'border-radius-base': '2px'
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
};
