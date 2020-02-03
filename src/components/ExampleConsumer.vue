<template>
  <div>
    Section with values in Provider context<br />
    {{ provided }}
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "ExampleConsumer",
  inject: ["provided"],
  props: {
    consumerName: {
      type: String,
      default: null
    }
  },
  watch: {
    provided: {
      immediate: true,
      deep: true,
      handler: function (value) {
        if (value.vuexModuleTarget) this.updateModule();
      }
    }
  },
  methods: {
    updateModule () {
      this.provided.vuexModuleTarget.dispatch('setExampleValue', `value from ${this.consumerName}`)
    }
  }
});
</script>

<style></style>
