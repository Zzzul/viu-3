<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button @click=" authStore.cobaLogin()">coba Login</button>
    <br>
    <button @click=" authStore.login('admin', 'admin')">Login</button>
    <br>
    <button @click="authStore.logout" v-if="authStore.getToken()">logout</button>

    <p>Message: <span :class="{'text-danger': authStore.getMsg()?.success == false}">{{ authStore.getMsg()?.message }}</span></p>

    <p>User</p>

    <code>
      {{ authStore.getUser() }}
    </code>
  </div>
</template>