<script setup>
import Food from '../components/Food.vue'
import Customer from '../components/Customer.vue'
import ProductCart from '../components/ProductCart.vue'
import Summary from '../components/Summary.vue'
import Action from '../components/Action.vue'
</script>

<template>
  <main class="container-fluid">
    <div class="row">
      <Food />

      <div class="col-md-4 bg-body-tertiary" style="min-height: 100vh;">
        <Customer />

        <ProductCart/>

        <Summary/>

        <Action/>
      </div>
    </div>
  </main>
</template>
