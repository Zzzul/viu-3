<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useFetch } from '../utils/fetch'
import { useRedirectStore } from '../stores/redirect'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const getProducts = async () => {
  await useFetch({
    url: '/products',
    method: 'GET',
    token: authStore.getToken()
  }).then(({ data }) => {
    console.log('products', data)
  }).catch(() => {
    // console.log(response)
    // useRedirectStore().setRedirectTo(route)
    // authStore.logout()
    console.log(route);
    router.push({ name: 'login' })
  })
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button @click=" authStore.cobaLogin()">coba Login</button>
    <br>
    <button @click=" authStore.login('admin', 'admin')">Login</button>
    <br>
    <button @click="authStore.logout" v-if="authStore.getToken()">logout</button>

    <p>Message: <span :class="{ 'text-danger': authStore.getAuthInfo()?.success == false }">{{
      authStore.getAuthInfo()?.message }}</span></p>

    <p>Status login: {{ authStore.isLoggedIn }}</p>

    <p>User</p>

    <code>
          {{ authStore.getUser() }}
        </code>


  </div>
</template>