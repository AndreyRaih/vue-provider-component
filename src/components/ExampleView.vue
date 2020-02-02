<template>
  <div>
    <VProvider
      :values="firstProvider.values"
      :vuexModuleCfg="firstProvider.vuexInitData"
    >
      <ExampleConsumer consumerName="first" />
    </VProvider>
    <VProvider
      :values="secondProvider.values"
      :vuexModuleCfg="secondProvider.vuexInitData"
    >
      <ExampleConsumer consumerName="second" />
    </VProvider>
    <p>
      Just example Vue App with separate provided data context<br />
      more info in the my
      <a href="https://github.com/AndreyRaih" target="_blank" rel="noopener"
        >Github</a
      >.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ExampleConsumer from "./ExampleConsumer.vue";
import vuexModule from "../store/example-module";

export default Vue.extend({
  name: 'ExampleView',
  components: {
    ExampleConsumer
  },
  data: () => ({
    firstProvider: {
      values: {
        props: `Some data in first provider's context`
      },
      vuexInitData: {
        name: "first-provider-module",
        data: vuexModule
      }
    },
    secondProvider: {
      values: {
        props: `Some data in second provider's context`
      },
      vuexInitData: {
        name: "second-provider-module",
        data: vuexModule
      }
    }
  })
});
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
