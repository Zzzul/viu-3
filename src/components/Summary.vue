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
        <p class="fw-bold">Summary</p>

        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Subtotal</th>
                    <td>
                        <h5>{{ cart.formatCurrency(cart.countSubTotal) }}</h5>
                    </td>
                </tr>
                <tr>
                    <th>Discount</th>
                    <td>
                        <vue-number v-bind="currencyFormat" v-model="cart.discount" class="form-control"></vue-number>
                    </td>
                </tr>
                <tr>
                    <th>Grand Total</th>
                    <td>
                        <h5 class="mt-2">{{ cart.formatCurrency(cart.countGrandTotal) }}</h5>
                    </td>
                </tr>
                <tr>
                    <th>Paid</th>
                    <td>
                        <div class="row g-0">
                            <div class="col-md-10">
                                <vue-number v-bind="currencyFormat" v-model="cart.paid" class="form-control"></vue-number>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-sm btn-primary ms-2 mt-1 p-1" @click="cart.autoPayment">Auto</button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>Change</th>
                    <td>
                        <h6>
                            <h5>{{ cart.formatCurrency(cart.countChange) }}</h5>
                        </h6>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>