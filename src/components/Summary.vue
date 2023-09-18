<script setup>
import { useCartStore } from '../stores/cart';

const cart = useCartStore();
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
                        <div class="input-group">
                            <span class="input-group-text" id="dicsount">Rp.</span>
                            <input type="number" class="form-control" placeholder="Discount" aria-label="Discount"
                                aria-describedby="dicsount" v-model="cart.discount">
                        </div>
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
                            <div class="col-md-9">
                                <div class="input-group">
                                    <span class="input-group-text" id="paid">Rp.</span>
                                    <input type="number" class="form-control" placeholder="Paid" aria-label="Paid"
                                        aria-describedby="paid" v-model="cart.paid">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-sm btn-primary ms-2 mt-1" @click="cart.autoPayment">Auto</button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>Change</th>
                    <td>
                        <h6><h5>{{ cart.formatCurrency(cart.countChange) }}</h5></h6>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>