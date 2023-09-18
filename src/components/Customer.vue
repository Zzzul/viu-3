<script setup>
import customers from '../assets/data/customers.json'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>

<template>
    <div>
        <label for="customer" class="form-label mt-3 float-start fw-bold">Customer</label>
        <a href="#" class="fw-light text-primary float-end mt-3 text-decoration-none">Add customer</a>
        <select class="form-select" aria-label="Select customer" v-model="cart.customer">
            <option value="" selected>Guest</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
        </select>
    </div>
</template>