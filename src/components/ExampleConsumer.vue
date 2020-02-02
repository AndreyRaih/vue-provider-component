<template>
  <div>
    Section with values in Provider context<br />
    {{ providedData }}
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "ExampleConsumer",
  inject: ["providedData"],
  props: {
    consumerName: {
      type: String,
      default: null
    }
  },
  watch: {
    providedData: {
      deep: true,
      handler: function (value) {
        if (value.vuexModuleTarget) this.updateModule();
      }
    }
  },
  methods: {
    updateModule () {
      this.providedData.vuexModuleTarget.dispatch('setExampleValue', `value from ${this.consumerName}`)
    }
  }
});
</script>

<style></style>
