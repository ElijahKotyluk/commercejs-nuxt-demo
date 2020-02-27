# CommerceJS Demo

Commerce.js SDK demo with NuxtJS.

Commerce.js SDK v2

[Live Demo](https://commercejs-nuxt-demo.herokuapp.com/)

## Overview

A summary of project's intent or overview of what will be accomplished.
1. Create a CommerceJS plugin within your Nuxt App
2. Render products server-side with Nuxt
3. List your products in a Nuxt application

### Requirements

List the software or tools needed.
- Commerce.js SDK
- Yarn or npm
- Nuxt.js
- Vuetify
- create-nuxt-app CLI (Optional)

### Prerequisites

List prerequisite knowledge if any.
- Nuxt.js
- JavaScript(ES6)


### Installing Commerce.js

Use our Commerce.js SDK to access the Chec API data from your application.

1. Installing via SDK

```js
// yarn
yarn add @chec/commerce.js

// npm
npm install --save @chec/commerce.js
```

### Project usage

A step by step series on injecting Commerce.js logic.

1. Create a minimal Commerce.js plugin for your Nuxt app

Create a new file in the plugins directory of your Nuxt app called `commerce.js`. You will begin this file by importing the Commerce.js SDK at the top of the file, followed by importing `Vue`. Next, inject the Commerce.js SDK with your API key into the `Vue` instance by setting a new property on the Vue instance called `$commerce`, which will allow you to access the commerce.js API through the Vue instance globally. Once you've done this all [features](https://commercejs.com/docs/overview/getting-started.html#features) of Commerce.js will be accessible on your `Vue` instance. Don't forget to add your new plugin's path to the plugins property located in the `nuxt.config.js` file of your project root so that Nuxt can inject it when building.

```js
// plugins/commerce.js
import Commerce from '@chec/commerce.js'
import Vue from 'vue'

Vue.prototype.$commerce = new Commerce(process.env.COMMERCEJS_API_KEY, true)

```

```js
// nuxt.config.js
module.exports = {
    // ...
    css: [],
    plugins: ['~/plugins/commerce.js'],
    buidModules: [],
    // ...
}

```

2. Create a file in your store directory called `index.js`

In your newly created `store/index.js` file you'll import the `Vue` instance so that you can utilize your new plugin that has been injected into the `Vue` instance. Once this is done, create your Vuex store's state, which will contain an empty array of products by default. Next you will create your store's actions, which will contain a special action specific to Nuxt.js - [nuxtServerInit()](https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action): This action gets called and fills your store with data on the server-side before rendering. This action is asynchronous and will wait for your list of products to be returned from the commerce.js API. Upon returned results, the action will commit the product data by calling the `setProducts` mutation and passing `products.data`, setting your state's products to the returned products list. The last little piece for the store is to write a getter that simply returns the state's list of products when called from your component. 

```js
// store/index.js
import { commerce } from '~/plugins/commerce'

export const state = () => ({
  products: []
})

export const actions = {
  async nuxtServerInit({ commit }) {
    const products = await commerce.products.list()

    // Pass products.data 
    commit('setProducts', products.data)
  }
}

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  }
}

export const getters = {
  products() {
    return state.products
  }
}
```

3. Create a `CommerceItem.vue` component file under your components directory.

The `components/CommerceItem.vue` component will be used as a dynamic template to display the data for each item in your products list. First, create your script tag that exports a `name` and the `props` of your Vue component. Your component's `props` will contain a `product` object where you will explicitly set it's type and default key/value property pairs. Next, create a basic template that contains some Vuetify components that can be used as a starting point to style and render each individual product's data.

```js
// components/CommerceItem.vue
<template>
  <v-card max-width="300">
    <v-card-title>
      {{ product.name }}
    </v-card-title>

    <v-divider class="mb-3"></v-divider>

    <v-img :src="product.media.source" />

    <v-divider class="mt-3 mb-1"></v-divider>

    <v-card-action>
      <span>${{ product.price.formatted }}</span>
    </v-card-action>
  </v-card>
</template>

<script>
export default {
  name: 'CommerceItem',
  props: {
    product: {
      type: Object,
      default: () => ({
        id: '',
        media: null,
        name: '',
        price: ''
      })
    }
  }
}
<script>
```

4. Use the `CommerceItem.vue` component and Vuex's mapGetters to display your product list.

Inside your pages directory should live an `index.vue` file, if you used **create-nuxt-app** then you'll want to delete all the default filler code provided by the CLI. Inside of the component's script tag import the `mapState` function, followed by the `CommerceItem.vue` component and be sure to add `CommerceItem` to the `components` property of `components/index.vue`. Next, we will utilize the `...mapGetters` function inside of the component's `computed()` properties, and use the `products` getter to return your products in state. Finally, create a simple template that uses Vue's `v-for` directive to dynamically render each of your store's products.

```js
// pages/index.vue
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-row>
        <template v-for="product in products">
          <v-col :key="product.id">
            <commerce-item :key="product.id" :product="product" />
          </v-col>
        </template>
      </v-row>
    </v-flex>
  </v-layout>
<template>

<script>
import { mapState } from 'vuex'
import CommerceItem from '~/components/CommerceItem'

export default {
  components: {
    CommerceItem
  },
  computed: {
    ...mapGetters({ products: 'products' })
  }
}
</script>
```

5. Run your app!

You should now be able to run your Nuxt application and see the products from your store display.

```js
// yarn
yarn dev

//npm
npm run dev
```

End with linking an example of live project or demo.
[Live Demo](https://commercejs-nuxt-demo.herokuapp.com/)


## Built With

* [Nuxt.js](https://github.com/nuxt/nuxt.js) - The front-end framework used
* [Vuetify](https://github.com/vuetifyjs/vuetify) - The Vue material component library used
* [Yarn](https://github.com/yarnpkg/yarn) - Package manager tool

## Authors

* **ElijahKotyluk** - [Github](https://github.com/ElijahKotyluk)

## Options

Add any additional customization notes if any.
