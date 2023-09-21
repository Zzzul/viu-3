<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const form = ref({
    username: '',
    password: ''
})

</script>
<template>
    <div class="container">
        <Transition>
            <div class="alert mt-3"
                :class="{ 'alert-success': authStore.getAuthInfo()?.success == true, 'alert-danger': authStore.getAuthInfo()?.success == false }"
                v-if="authStore.getAuthInfo()?.message">
                {{ authStore.getAuthInfo()?.message }}
            </div>
        </Transition>

        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">Login</h5>
                <form @submit.prevent="authStore.login(form.username, form.password)">
                    <div class="mb-3">
                        <label for="exampleInputusername1" class="form-label">Username</label>
                        <input v-model="form.username" type="text" class="form-control" id="exampleInputusername1"
                            aria-describedby="usernameHelp" placeholder="Enter username">
                        <div id="usernameHelp" class="form-text">We'll never share your username with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1"
                            placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>