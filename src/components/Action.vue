<script setup>
import { useCartStore } from '../stores/cart'
import cards from '../assets/data/cards.json'
import { Modal } from 'bootstrap'
import { ref } from 'vue'
import emptyHoldCart from '../../public/location-search.svg'

const cart = useCartStore()
const getHoldCartModalRef = ref(null)

/**
 * Remove a cart from the hold cart list.
 *
 * @param {number} index - The index of the cart to be removed.
 * @return {void} This function does not return anything.
 */
const removeHoldCart = (index) => {
    cart.removeHoldCart(index)
    closeModalHoldCart()
}

/**
 * Selects a hold cart at the specified index and closes the modal.
 *
 * @param {number} index - The index of the hold cart to select.
 * @return {void} 
 */
const selectHoldCart = (index) => {
    cart.selectHoldCart(index)
    closeModalHoldCart()
}

/**
 * Auto-fills the card information name based on the customer name.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
const autoFillCardInfoName = () => {
    cart.cardInformation.name = cart.customer
}

const closeModalHoldCart = () => Modal.getInstance(getHoldCartModalRef.value)?.hide()
</script>

<template>
    <div class="row g-0 mb-4">
        <div class="col-md-7">
            <a href="#" class="text-decoration-none text-primary" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">Use Card / E-Money</a>
            <br>
            <!-- <a href="#" class="text-decoration-none text-primary">Multipayment</a>
            <br> -->
            <a href="#" class="text-decoration-none text-primary" data-bs-toggle="modal" data-bs-target="#getHoldCart">Get
                Hold Carts</a>
        </div>
        <div class="col-md-5">
            <button class="float-end btn btn-success me-0" :disabled="!cart.isCanSave" @click="cart.save">
                <i class="bi bi-save-fill"></i> Save
            </button>
            <button class="float-end btn btn-warning me-2" @click="cart.addToHoldCart"> <i class="bi bi-pin-fill"></i>
                Hold</button>
        </div>

        <!-- Card Payment -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Card / E-Money Payment</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4" :class="{ 'mt-3': i >= 3 }" v-for="(card, i) in cards" :key="card.id">
                                <div class="card" :class="{ 'border-primary': cart.card === card.name }"
                                    style="cursor: pointer;" @click="cart.selectCard(card.name)">
                                    <div class="card-body">
                                        <h6 class="card-title text-center mt-2">{{ card.name }}</h6>
                                        <!-- <p class="card-text">{{ card.number }}</p> -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mt-3">
                                <div class="card" :class="{ 'border-danger': cart.card === '' }"
                                    @click="cart.selectCard('')" style="cursor: pointer;">
                                    <div class="card-body">
                                        <h6 class="card-title text-center mt-2">No Card</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <template v-if="cart.card != ''">
                            <hr>
                            <h6>Card Information</h6>
                            <label for="name">Name</label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Name" aria-label="Name"
                                    aria-describedby="basic-addon2" v-model="cart.cardInformation.name">
                                <span class="input-group-text" id="basic-addon2" style="cursor: pointer;"
                                    @click="autoFillCardInfoName">
                                    <i class="bi bi-arrow-clockwise"></i>
                                </span>
                            </div>

                            <label for="number" class="mt-2">Number</label>
                            <input type="number" class="form-control" id="number" aria-describedby="number"
                                placeholder="Number" v-model="cart.cardInformation.number">
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Hold Cart -->
        <div class="modal modal-lg fade" id="getHoldCart" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="getHoldCartLabel" aria-hidden="true" ref="getHoldCartModalRef">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="getHoldCartLabel">Hold Cart</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Customer</th>
                                        <th>Total Product</th>
                                        <th>Grand Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="cart.holdCarts.length > 0">
                                        <tr v-for="(hold, i) in cart.holdCarts" :key="i">
                                            <td>{{ i + 1 }}</td>
                                            <td>{{ hold?.customer == '' ? '-' : hold.customer }}</td>
                                            <td>{{ hold.carts.length }}</td>
                                            <td>{{ cart.formatCurrency(parseInt(hold.carts.reduce((acc, item) => acc +
                                                (item.discount ?
                                                    item.discount : item.price) * item.quantity, 0))) }}</td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-success" @click="selectHoldCart(i)">
                                                    <i class="bi bi-hand-index-thumb-fill"></i>
                                                </button>
                                                <button class="btn btn-sm btn-outline-danger ms-2"
                                                    @click="removeHoldCart(i)">
                                                    <i class="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr>
                                            <td colspan="6" class="text-center">
                                                <img :src="emptyHoldCart" alt="Empty hold cart" class="img-fluid"
                                                    width="150">
                                                <p class="text-center text-danger mt-3 mb-0">Empty Hold Cart</p>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>