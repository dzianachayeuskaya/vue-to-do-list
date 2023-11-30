export default {
  ssr: false,

  head: {
    title: 'to-do-list',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/vue-to-do-list/to-do-list.svg',
      },
    ],
  },

  css: ['ant-design-vue/dist/antd.css', '~/assets/css/main.scss'],

  target: 'static',

  router: {
    base: '/vue-to-do-list/',
  },

  plugins: ['@/plugins/antd-ui'],

  components: true,

  buildModules: ['@nuxtjs/eslint-module'],

  modules: [],

  build: {},
}
