# About VueProviderComponent

At first, this is a component, which realize some quite famous solution with two and more different data context in one component's composition.

It's include: combination basic features of VueJS **provide/inject** options for sharing some state between parent and child components and [vue-reactive-provide mixin](https://github.com/LinusBorg/vue-reactive-provide) for adding reactivity system in the state.

At second, the component has simple API for making to [Vuex modules](https://vuex.vuejs.org/guide/modules.html) instances with namespace and default binding for children components.

## Installation

Installing with **npm**:
```
npm install -D vue-provider-component
```
Or if you prefer **yarn**:
```
yarn add -D vue-provider-component
```

After this, you can use the library only inside your components:

    //...code of your VueJS component
    
    <script>
    import { VProvider } from 'vue-provider-component';
    
    export default {
    // ... Other component's options
	    components: {
		    VProvider
		}
	// ...
	};
	</script>




Or with adding like a Plugin in your **main.js** file:

    import Vue from 'vue';
	import VProvider from 'vue-provider-component';

	Vue.use(ReactiveProvide);



## Basic usage

After installing you can use it in two cases, both separately and together:


    <template>
		<div>
			<VProvider :values="sharedData">
				<ExampleConsumer />
			</VProvider>
		</div>
	</temaplate>
	
	<script>
	export default {
		...
		data: () => ({
			sharedData: {
				// your data
			}
		}),
		...
	};
	</script>

After this, each children, who has a **inject** option with subscribes on **"providedData"** Symbol will get the **sharedData**  from parent. It's possible on each level of nesting.

For example, in **ExampleConsumer.vue**:
```
<script>
export default {
	...// "ExampleConsumer" options...
	inject: ["providedData"]
	...
};
</script>
```
Also, you can provide access to Vuex module:
```
<template>
	<div>
		<VProvider :vuexModuleCfg="vuexInitObj">
			<ExampleConsumer />
		</VProvider>
	</div>
</temaplate>
	
<script>
import someVuexModule from 'path/to/your/module';
export default {
	...
	data: () => ({
		vuexInitObj: {
			// This is a name for your namespaced module
			name: 'provide-module',
			data: someVuexModule
		}
	}),
	...
};
</script>
```
And after adding, you can get access to all features of your module inside children components with providedData's option **vuexModuleTarget**:
```
// Inside children component
<script>
export default {
	...
	methods: {
		updateModule () {
			this.providedData.vuexModuleTarget.dispatch('actionName', this.someValue)
		}
	}
	...
};
</script>
```
However, you can use another methods and properties like **commit**, **getters** and **state**, because vuexModuleTarget object, has properties with mapped to these options inside:
```
vuexModuleTarget = {
	state:  this.$store.state[vuexModuleData.name],
	dispatch: (actionName, payload) =>  this.$store.dispatch(`${vuexModuleData.name}/${actionName}`, payload),
	commit: (actionName, payload) =>  this.$store.commit(`${vuexModuleData.name}/${actionName}`, payload),
	getters:  this.$store.getters[vuexModuleData.name],
}
```
## Development

### Compiles and hot-reloads for development
```
yarn run serve
```
### Build for production

```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```