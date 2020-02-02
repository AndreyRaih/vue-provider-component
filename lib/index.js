import VueDataProvider from './component/Provider.js';

export default {
  install (Vue) {
    Vue.component('VProvider', VueDataProvider)
  }
};