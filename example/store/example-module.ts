import { IModuleState, IRoot } from "./types";
import { MutationTree, ActionTree } from "vuex";

const state = () => ({
  exampleValue: null
} as IModuleState);

const mutations: MutationTree<IModuleState> = {
  SET_EXAMPLE_VALUE(state: any, val: any) {
    state.exampleValue = val;
  }
};

const actions: ActionTree<IModuleState, IRoot> = {
  setExampleValue: ({ commit }, val: any) => commit("SET_EXAMPLE_VALUE", val)
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
