<script setup>
import { useCartStore } from '../stores/cart'
import { component as VueNumber } from '@coders-tm/vue-number-format'

const cart = useCartStore()
const currencyFormat = {
    decimal: ',',
    separator: '.',
    prefix: 'Rp. ',
    precision: 0,
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between">
            <p class="mt-4 fw-bold">Products ({{ cart.carts.length }})</p>
            <p class="mt-4 text-danger fw-light" @click="cart.clearCart" style="cursor: pointer;">Clear</p>
        </div>

        <template v-if="cart.carts.length > 0">
            <div class="alert alert-light p-2" role="alert" v-for="(c, i) in cart.carts" :key="c.id">
                <div class="row">
                    <div class="col-md-8">
                        <p class="mb-0">{{ c.name }}
                            <button class="btn btn-sm btn-transparent p-0 mb-1 text-danger" @click="cart.removeItem(c.id)">x</button>
                        </p>

                        <p class="mb-0 mt-0">
                            <s v-if="c.discount">{{ cart.formatCurrency(c.price) }}</s>
                            <span v-else>{{ cart.formatCurrency(c.price) }}</span>
                            <span v-if="c.discount" class="ms-2">{{ cart.formatCurrency(c.discount) }}</span>
                        </p>

                        <a href="#" class="fw-light mt-0 text-primary text-decoration-none"
                            style="font-size: 11px; cursor: pointer;" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop' + c.id" v-if="!c.discount">Add dicsount</a>

                            <a href="#" class="fw-light mt-0 text-danger text-decoration-none"
                            style="font-size: 11px; cursor: pointer;"  v-if="c.discount" @click="cart.removeDiscountItem(i)">Remove dicsount</a>
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

                <div class="modal modal-sm fade" :id="'staticBackdrop' + c.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title fs-6" id="staticBackdropLabel">Add {{ c.name }} discount</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label :for="'discount' + c.id">Discount</label>
                                <vue-number class="form-control" v-model="c.discount" :id="'discount' + c.id" v-bind="currencyFormat" :max="c.price"></vue-number>
                            </div>
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