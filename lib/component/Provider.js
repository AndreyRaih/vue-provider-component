import { ReactiveProvideMixin } from "vue-reactive-provide";

export default {
  name: "Provider",
  props: {
    values: {
      default: null
    },
    vuexModuleCfg: {
      default: () => ({
        name: null,
        data: null
      })
    }
  },
  data: () => ({
    vuexModuleTarget: null
  }),
  watch: {
    vuexModuleCfg: {
      immediate: true,
      deep: true,
      handler (vuexModuleData) {
        if (vuexModuleData) this.createStoreModule(vuexModuleData);
      }
    }
  },
  methods: {
    createStoreModule (vuexModuleData) {
      if (vuexModuleData.name && vuexModuleData.data && this.$store) {
        this.$store.registerModule(vuexModuleData.name, vuexModuleData.data);
        this.vuexModuleTarget = {
          state: this.$store.state[vuexModuleData.name],
          dispatch: (actionName, payload) => this.$store.dispatch(`${vuexModuleData.name}/${actionName}`, payload),
          commit: (actionName, payload) => this.$store.commit(`${vuexModuleData.name}/${actionName}`, payload),
          getters: this.$store.getters[vuexModuleData.name],
        }
      } else if (vuexModuleData.name && vuexModuleData.data && !this.$store) {
        console.warn("No Vuex detacted: For the correct work of this function, you should install Vuex");
      }
    }
  },
  mixins: [
    ReactiveProvideMixin({
      name: "providedData",
      include: ["values", "vuexModuleTarget"]
    })
  ],
  destroyed () {
    if (this.vuexModuleCfg.name && this.$store) {
      this.$store.unregisterModule(this.vuexModuleCfg.name);
    }
  },
  render: function (createElement) {
    return createElement('div', this.$slots.default);
  }
}
