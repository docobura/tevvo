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
  <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
    <div class="row shadow-lg rounded-4 overflow-hidden bg-white w-100" style="max-width: 1000px;">
      
      <!-- Left Section -->
      <div class="col-md-6 p-5 d-flex flex-column justify-content-center">
        <h2 class="fw-bold">Welcome back!</h2>
        <p class="text-muted small mb-4">
          Simplify your search for good shows by going through our page and the ratings 
        </p>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <input v-model="username" type="text" class="form-control rounded-pill" placeholder="Username" />
          </div>
          <div class="mb-2">
            <input v-model="password" type="password" class="form-control rounded-pill" placeholder="Password" />
          </div>
          <div class="d-flex justify-content-end mb-3">
            <a href="#" class="small text-muted text-decoration-none">Forgot Password?</a>
          </div>
          <button type="submit" class="btn btn-dark w-100 rounded-pill py-2">Login</button>
          <div v-if="error" class="text-danger text-center small mt-2">{{ error }}</div>
        </form>

        <div class="d-flex align-items-center text-muted my-4">
          <div class="flex-fill border-top"></div>
          <div class="mx-3 small">or continue with</div>
          <div class="flex-fill border-top"></div>
        </div>

        <div class="d-flex justify-content-center gap-3">
          <button class="btn btn-dark rounded-circle p-2"><i class="bi bi-google"></i></button>
          <button class="btn btn-dark rounded-circle p-2"><i class="bi bi-apple"></i></button>
          <button class="btn btn-dark rounded-circle p-2"><i class="bi bi-facebook"></i></button>
        </div>

        <p class="text-center small text-muted mt-4">
          Not a member? <a href="#" class="text-success text-decoration-none">Register now</a>
        </p>
      </div>

      <!-- Right Section -->
      <div class="col-md-6 d-flex flex-column align-items-center justify-content-center bg-success-subtle text-center p-4">
        <img src="https://images.pexels.com/photos/29097935/pexels-photo-29097935.jpeg" alt="Illustration" class="img-fluid mb-4" style="max-height: 300px;" />
        <h5 class="fw-bold mb-1">Make your work easier and organized</h5>
        <p class="mb-0"></p>
          Discover a world of entertainment with our curated TV shows. 
          Find your next binge-worthy series and enjoy seamless streaming.
      </div>

    </div>
  </div>
</template>
