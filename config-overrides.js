const {injectBabelPlugin} = require('react-app-rewired');
const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config); // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {'@primary-color': '#096dd9'}
  })(config, env);
  if (env === 'production') {
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: 'static',
      reportFilename: 'report.html'
    });
  }
  return config;
};
