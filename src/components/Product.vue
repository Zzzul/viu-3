<script setup>
import products from '../assets/data/products.json'
import categories from '../assets/data/categories.json'
import { useCartStore } from '../stores/cart'
import { ref, watch } from 'vue'

const cart = useCartStore()
const search = ref('')

const filteredProducts = ref(products)
const selectedCategory = ref(0)

const filterCategory = (id) => {
    if (id != 0) {
        if (id == selectedCategory.value) {
            selectedCategory.value = 0
            filteredProducts.value = products
            return
        }

        filteredProducts.value = products.filter(product => product.category_id == id)
        selectedCategory.value = id
        return
    }

    filteredProducts.value = products
    selectedCategory.value = 0
}

watch(search, () => {
    filteredProducts.value = products.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()))
})
</script>

<template>
    <div class="col-md-8 mt-4">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col-md-12">
                <div class="row g-0">
                    <div class="col-md-2 mb-3" v-for="(category, i) in categories" :key="category.id"
                        @click="filterCategory(category.id)">
                        <div class="card" :class="{ 'ms-3': i != 0, 'border-primary': selectedCategory == category.id }"
                            style="cursor: pointer;">
                            <div class="card-body p-2">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img :src="category.image" alt="image"
                                            style="border-radius: 50%; width: 30px; object-fit: cover;">
                                    </div>
                                    <div class="col-md-8">
                                        <p class="mt-1 mb-0">{{ category.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-2 mb-3" @click="filterCategory(0)" style="cursor: pointer;">
                        <div class="card ms-3" :class="{ 'border-primary': selectedCategory == 0 }">
                            <div class="card-body p-2">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src="https://placehold.co/400x300?text=See+all" alt="image"
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

                <input type="search" class="form-control" placeholder="Search..." aria-label="Search" v-model="search"
                    aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="col-md-2" v-for="product in filteredProducts" :key="product.id" @click="cart.addToCart(product)">
                <div class="card" style="cursor: pointer;">
                    <img :src="product.image" class="card-img-top" :alt="product.name" lazy>
                    <div class="card-body">
                        <h6 class="card-title">{{ product.name }}</h6>
                        <p class="card-text mb-1">{{ cart.formatCurrency(product.price) }}</p>
                        <!-- <small class="fw-light">Stock: {{ product.stock }}</small> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>