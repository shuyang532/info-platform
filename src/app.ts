import Vue from 'vue';
import store from './store';

import './app.scss';

import TaroUiVue from 'taro-ui-vue/src'
import 'taro-ui-vue/dist/style/index.scss'
Vue.use(TaroUiVue)

// Vue.config.productionTip = false

const App = new Vue({
  store,
  onShow (options) {
    console.log('进入小程序');
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default);
  }
})

export default App
