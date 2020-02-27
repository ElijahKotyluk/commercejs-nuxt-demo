<template>
  <v-card max-width="300">
    <v-card-title class="title text-truncate">
      {{ product.name }}
    </v-card-title>

    <v-divider class="mb-3"></v-divider>

    <v-img :src="product.media.source" />

    <v-divider class="mt-3 mb-1"></v-divider>

    <v-card-actions>
      <span class="mx-2">${{ product.price.formatted }}</span>

      <v-spacer></v-spacer>

      <v-btn
        :disabled="product.quantity <= 0"
        class="subtitle-2 text-capitalize"
        color="green"
        text
      >
        Add To Cart
      </v-btn>
    </v-card-actions>
    <v-overlay
      :value="product.quantity <= 0"
      absolute
      opacity="0.55"
      z-index="3"
    >
      <span>SOLD</span>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  name: 'CommerceItem',
  props: {
    product: {
      type: Object,
      default: () => ({
        description: '',
        id: '',
        media: null,
        name: '',
        price: null,
        quantity: null
      })
    }
  }
}
</script>
