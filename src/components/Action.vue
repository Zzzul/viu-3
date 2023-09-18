<script setup>
import { useCartStore } from '../stores/cart';

const cart = useCartStore()
</script>

<template>
    <div class="row g-0 mb-4">
        <div class="col-md-7">
            <a href="#" class="text-decoration-none text-primary">Use card/e-money</a>
            <br>
            <a href="#" class="text-decoration-none text-primary">Multipayment</a>
        </div>
        <div class="col-md-5">
            <button class="float-end btn btn-success me-0" :disabled="!cart.isCanSave">Save</button>
            <button class="float-end btn btn-warning me-2">Hold</button>
        </div>
    </div>
</template>