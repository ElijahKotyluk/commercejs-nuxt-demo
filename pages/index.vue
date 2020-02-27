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
</template>

<script>
import { mapGetters } from 'vuex'
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
