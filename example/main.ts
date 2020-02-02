import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VProvider from '../lib/index.js';

Vue.use(VProvider);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
