const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config); // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {'@primary-color': '#00b49f'}
  })(config, env);
  return config;
};
