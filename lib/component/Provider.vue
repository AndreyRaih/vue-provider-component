<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "VProvider",
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
      handler: function (vuexModuleData) {
        if (vuexModuleData.name && vuexModuleData.data) this.createStoreModule(vuexModuleData);
      }
    }
  },
  methods: {
    createStoreModule (vuexModule) {
      if (vuexModule.name && vuexModule.data && this.$store) {
        this.$store.registerModule(vuexModule.name, vuexModule.data);
        this.vuexModuleTarget = {
          state: this.$store.state[vuexModule.name],
          dispatch: (actionName, payload) => this.$store.dispatch(`${vuexModule.name}/${actionName}`, payload),
          commit: (actionName, payload) => this.$store.commit(`${vuexModule.name}/${actionName}`, payload),
          getters: this.$store.getters[vuexModule.name],
        }
      } else if (vuexModule.name && vuexModule.data && !this.$store) {
        console.warn("No Vuex detacted: For the correct work of this function, you should install Vuex");
      }
    }
  },
  reactiveProvide: {
    name: "provided",
    include: ["values", "vuexModuleTarget"]
  },
  destroyed () {
    if (this.vuexModuleCfg.name && this.$store) {
      this.$store.unregisterModule(this.vuexModuleCfg.name);
    }
  }
}
</script>
