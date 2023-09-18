<script setup>
import products from '../assets/data/products.json'
import categories from '../assets/data/categories.json'
import { useCartStore } from '../stores/cart'
import { ref } from 'vue'

const cart = useCartStore()
const search = ref('')
</script>

<template>
    <div class="col-md-8 mt-4">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col-md-12">
                <div class="row g-0">
                    <div class="col-md-2 mb-3" v-for="(category, i) in categories" :key="category.id">
                        <div class="card" :class="{ 'ms-3': i != 0 }" style="cursor: pointer;">
                            <div class="card-body p-2">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src="https://placehold.co/400" alt="image"
                                            style="border-radius: 50%; width: 30px; object-fit: cover;">
                                    </div>
                                    <div class="col-md-8">
                                        <p class="mt-1 mb-0">{{ category.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-2 mb-3">
                        <div class="card ms-3">
                            <div class="card-body p-2">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src="https://placehold.co/400" alt="image"
                                            style="border-radius: 50%; width: 30px; object-fit: cover;">
                                    </div>
                                    <div class="col-md-8">
                                        <p class="mt-1 mb-0">See all</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <input type="text" class="form-control" placeholder="Search..." aria-label="Search" v-model="search"
                    aria-describedby="inputGroup-sizing-default">

            </div>
            <div class="col-md-2" v-for="product in products" :key="product.id" @click="cart.addToCart(product)">
                <div class="card" style="cursor: pointer;">
                    <img src="https://placehold.co/600x400" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="card-text">{{ cart.formatCurrency(product.price) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>