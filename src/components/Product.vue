<script setup>
import products from '../assets/data/products.json'
import categories from '../assets/data/categories.json'
import emptyProduct from '../../public/empty-product.svg'
import { onMounted, ref, watch } from 'vue'
import { useCartStore } from '../stores/cart'
import { useFilterProductStore } from '../stores/filter-product'

const cart = useCartStore()
const filterProductStore = useFilterProductStore()
const search = ref(filterProductStore.search)
const filteredProducts = ref(products)

const filterByCategory = (id) => {
    filterProductStore.categoryId = id

    if (id == 0) {
        // only filter by search
        filteredProducts.value = products.filter((product) => product.name.toLowerCase().includes(search.value.toLowerCase()))
        return
    }

    // filter by category and search
    filteredProducts.value = products.filter(product => product.category_id == id).filter((product) => product.name.toLowerCase().includes(search.value.toLowerCase()))
}

watch(search, () => {
    filterProductStore.search = search.value
    filterByCategory(filterProductStore.categoryId)
})

onMounted(() => {
    filterByCategory(filterProductStore.categoryId)
})
</script>

<template>
    <div class="col-md-8 mt-4">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col-md-12">
                <div class="row g-0">
                    <div class="col-md-2 mb-3" v-for="(category, i) in categories" :key="category.id"
                        @click="filterByCategory(category.id)">
                        <div class="card"
                            :class="{ 'ms-3': i != 0, 'border-primary': filterProductStore.categoryId == category.id }"
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

                    <div class="col-md-2 mb-3" @click="filterByCategory(0)" style="cursor: pointer;">
                        <div class="card ms-3" :class="{ 'border-primary': filterProductStore.categoryId == 0 }">
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

            <template v-if="filteredProducts.length > 0">
                <div class="col-md-2" v-for="product in filteredProducts" :key="product.id"
                    @click="cart.addToCart(product)">
                    <div class="card" style="cursor: pointer;">
                        <img :src="product.image" class="card-img-top" :alt="product.name" lazy>
                        <div class="card-body">
                            <h6 class="card-title">{{ product.name }}</h6>
                            <p class="card-text mb-1">{{ cart.formatCurrency(product.price) }}</p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body pb-1">
                            <h5 class="card-title text-danger text-center">
                                <img :src="emptyProduct" alt="Empty Product" class="img-fluid rounded" width="200">
                                <br>
                                <br>
                                <span class="mt-5">Product not found.</span>
                            </h5>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>