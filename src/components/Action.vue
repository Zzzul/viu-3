<script setup>
import { useCartStore } from '../stores/cart'
import cards from '../assets/data/cards.json'

const cart = useCartStore()
</script>

<template>
    <div class="row g-0 mb-4">
        <div class="col-md-7">
            <a href="#" class="text-decoration-none text-primary" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">Use card/e-money</a>
            <br>
            <a class="text-decoration-none text-primary">Multipayment</a>
        </div>
        <div class="col-md-5">
            <button class="float-end btn btn-success me-0" :disabled="!cart.isCanSave" @click="cart.save">Save</button>
            <button class="float-end btn btn-warning me-2" @click="cart.setToHoldCart">Hold</button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
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

                            <label for="name" class="mt-1">Name</label>
                            <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Name" v-model="cart.cardInformation.name">

                            <label for="number" class="mt-2">Number</label>
                            <input type="number" class="form-control" id="number" aria-describedby="number"
                                placeholder="Number" v-model="cart.cardInformation.number">
                        </template>
                    </div>
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div> -->
                </div>
            </div>
        </div>
</div></template>