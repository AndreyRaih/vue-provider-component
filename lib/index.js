import VueDataProvider from './component/Provider.vue';
import ReactiveProvide from "vue-reactive-provide";
export default {
  install (Vue) {
    Vue.use(ReactiveProvide);
    Vue.component('VProvider', VueDataProvider);
  }
};