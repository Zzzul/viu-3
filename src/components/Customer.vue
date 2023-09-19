<script setup>
import { useCartStore } from '../stores/cart'
import { ref } from 'vue'
import { useCustomerStore } from '../stores/customer'

const customerStore = useCustomerStore()
const cart = useCartStore()
const customers = ref(customerStore.customers)
const customerName = ref('')
const addCustomer = () => {
    if(!customerName.value){
        return
    }

    const length = customers.value.length

    customerStore.addCustomer({
        id: length,
        name: customerName.value
    })

    cart.customer = customers.value[length].name
    customerName.value = ''
}
</script>

<template>
    <div>
        <label for="customer" class="form-label mt-3 float-start fw-bold">Customer</label>
        <a href="#" class="fw-light text-primary float-end mt-3 text-decoration-none" data-bs-toggle="modal"
            data-bs-target="#addCustomer">Add customer</a>

        <input class="form-control" list="customerOptions" id="exampleDataList" placeholder="Type to search..."
            v-model="cart.customer">
        <datalist id="customerOptions">
            <option v-for="customer in customers" :key="customer.id" :value="customer.name">{{ customer.id }}</option>
        </datalist>

        <!-- Modal -->
        <div class="modal fade" id="addCustomer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="addCustomerLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form action="#" @submit.prevent="addCustomer">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addCustomerLabel">Create Customer</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="name">Name</label>
                            <input class="form-control" id="name" type="text" v-model="customerName" required />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button class="btn btn-primary" type="submit" data-bs-dismiss="modal">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>