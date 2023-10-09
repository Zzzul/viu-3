<script setup>
import { useCartStore } from '../stores/cart'
import { component as VueNumber } from '@coders-tm/vue-number-format'
import emptyCart from '../../public/empty-cart.svg'

const cart = useCartStore()
const currencyFormat = {
    decimal: ',',
    separator: '.',
    prefix: 'Rp. ',
    precision: 0,
}
const formatQty = {
    decimal: ',',
    separator: '.',
    prefix: '',
    precision: 0,
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between">
            <p class="mt-4 fw-bold">Products ({{ cart.carts.length }})</p>
            <p class="mt-4 text-danger fw-light" @click="cart.clearCart" style="cursor: pointer;">Clear</p>
        </div>

        <div v-if="cart.carts.length > 0" style="max-height: 790px; overflow-y: scroll; overflow-x: hidden;">
            <div class="alert alert-light p-2" role="alert" v-for="(c, i) in cart.carts" :key="c.id">
                <div class="row">
                    <div class="col-md-8">
                        <p class="mb-0">{{ c.name }}
                            <button class="btn btn-sm btn-transparent pt-1 pb-0 ps-0 mb-1 text-danger" @click="cart.removeItem(c.id)">
                            <i class="bi bi-x-circle"></i>
                            </button>
                        </p>

                        <p class="mb-0 mt-0">
                            <s v-if="c.discount || c.isFree">{{ cart.formatCurrency(c.price) }}</s>
                            <span v-else>{{ cart.formatCurrency(c.price) }}</span>
                            <span v-if="c.discount && c.discount > 0" class="ms-2 fw-bold">{{ cart.formatCurrency(c.discount) }}</span>
                            <span v-if="c.isFree && !c.discount" class="fw-bold ms-2">Free</span>
                        </p>

                        <a class="fw-light mt-0 text-primary text-decoration-none"
                            style="font-size: 11px; cursor: pointer;" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop' + c.id" v-if="!c.discount && !c.isFree">Add dicsount</a>

                            <a class="fw-light mt-0 text-danger text-decoration-none"
                            style="font-size: 11px; cursor: pointer;"  v-if="c.discount || c.isFree" @click="cart.removeDiscountItem(i)">Remove dicsount</a>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group input-group-sm my-3">
                            <button class="btn btn-outline-secondary" type="button"
                                @click="cart.decrementQuantity(c.id)">-</button>
                            <vue-number class="form-control" v-model="c.quantity" v-bind="formatQty"
                                aria-label="Quantity" :max="c.stock" :min="1"></vue-number>
                            <button class="btn btn-outline-secondary" type="button"
                                @click="cart.incrementQuantity(c.id)">+</button>
                        </div>
                    </div>
                </div>

                <div class="modal modal-sm fade" :id="'staticBackdrop' + c.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title fs-6" id="staticBackdropLabel">Add {{ c.name }} discount</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label :for="'discount' + c.id" class="d-flex justify-content-between">
                                    <span>Discount </span>
                                    <span class="fw-light text-primary" style="cursor: pointer;" @click="cart.setToFree(i)">Set to free(0)</span>
                                </label>
                                <vue-number class="form-control" v-model="c.discount" :id="'discount' + c.id" v-bind="currencyFormat" :max="c.price" :min="0" :disabled="c.isFree"></vue-number>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-else>
            <div class="card">
                <div class="card-body text-center">
                    <img :src="emptyCart" alt="empty cart" class="img-fluid" width="150">
                    <p class="mb-0 mt-3 text-danger">Cart is empty</p>
                </div>
            </div>
        </template>
    </div>
</template>