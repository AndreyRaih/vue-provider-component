import Vue from "vue";
import Vuex from "vuex";
import { StoreOptions } from "vuex";
import { IRoot } from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
} as StoreOptions<IRoot>);
