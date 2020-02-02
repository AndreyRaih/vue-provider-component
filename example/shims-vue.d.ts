declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.js";

declare module "VProvider" {
  import { Store } from "vuex";
}
