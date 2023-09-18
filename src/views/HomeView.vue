<script setup>
import Product from '../components/Product.vue'
import Customer from '../components/Customer.vue'
import Cart from '../components/Cart.vue'
import Summary from '../components/Summary.vue'
import Action from '../components/Action.vue'
</script>

<template>
  <main class="container-fluid">
    <div class="row">
      <Product />

      <div class="col-md-4 bg-body-tertiary" style="min-height: 100vh;">
        <Customer />

        <Cart/>

        <Summary/>

        <Action/>
      </div>
    </div>
  </main>
</template>
