<script setup>
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>

<template>
    <div>
        <div class="d-flex justify-content-between">
            <p class="mt-4 fw-bold">Products ({{ cart.carts.length }})</p>
            <p class="mt-4 text-danger fw-light" @click="cart.clearCart" style="cursor: pointer;">Clear</p>
        </div>

        <template v-if="cart.carts.length > 0">
            <div class="alert alert-light" role="alert" v-for="c in cart.carts" :key="c.id">
                <div class="row">
                    <div class="col-md-8">
                        <p class="mb-1">{{ c.name }}
                            <button class="btn btn-sm btn-transparent p-0 mb-1 text-danger" @click="cart.removeItem(c.id)">x</button>
                        </p>

                        <p class="mb-0">{{ cart.formatCurrency(c.price) }}</p>

                        <a href="#" class="fw-light mt-0 text-primary text-decoration-none"
                            style="font-size: 11px; cursor: pointer;">Add dicsount</a>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group input-group-sm my-3">
                            <button class="btn btn-outline-secondary" type="button"
                                @click="cart.decrementQuantity(c.id)">-</button>
                            <input type="number" class="form-control" v-model="c.quantity"
                                aria-label="Dollar amount (with dot and two decimal places)">
                            <button class="btn btn-outline-secondary" type="button"
                                @click="cart.incrementQuantity(c.id)">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="alert alert-danger p-2">
                <p class="mb-0 text-center">Cart is empty</p>
            </div>
        </template>
    </div>
</template>