const path = require('path');
function resolve(dir) {
  // 路径可能与你的项目不同
  return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        // proxy: null, // string | Object
        before: app => {}
    },
    chainWebpack: config => {
        config.module
        .rule('svg')
        .uses.clear()
        config.module
        .rule('svg1')
        .test(/\.svg$/)
        .use('svg-sprite')
            .loader('svg-sprite-loader')
            .options({
            symbolId: 'icon-[name]'
            })
            .end()
        .include
            .add(resolve('src/icons'))
            .end()
    }
}

