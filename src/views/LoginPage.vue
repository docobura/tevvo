<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const username = ref('');
const password = ref('');
const error = ref('');
const auth = useAuthStore();

const handleLogin = async () => {
  try {
    await auth.login({
      username: username.value,
      password: password.value
    });
  } catch (err) {
    error.value = 'Invalid username or password';
  }
};
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>
