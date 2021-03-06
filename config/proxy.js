/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/lot/': {
      target: 'http://127.0.0.1:9090',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/lot/': {
      target: 'http://139.9.210.27:9090',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/lot/': {
      target: 'http://47.99.98.83:9090/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
