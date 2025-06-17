<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const show = ref(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(`https://api.tvmaze.com/shows/${route.params.id}`);
    show.value = response.data;
  } catch (error) {
    console.error("Failed to fetch show details:", error);
  } finally {
    loading.value = false;
  }
});

const goBack = () => router.push('/');
</script>

<template>
  <div class="bg-dark text-light min-vh-100">
    <!-- Navbar -->
    <nav class="navbar navbar-dark bg-primary px-4 shadow d-flex justify-content-between">
      <button class="btn btn-outline-light" @click="goBack">
        ← Back to Shows
      </button>
      <span class="navbar-brand mb-0 h1">Show Details</span>
    </nav>

    <!-- Content -->
    <div class="container py-5">
      <div class="row bg-white text-dark rounded-4 shadow overflow-hidden">
        <!-- Left: Image -->
        <div class="col-md-6 p-0 bg-light d-flex align-items-center justify-content-center">
          <img
            v-if="show?.image?.original"
            :src="show.image.original"
            :alt="show.name"
            class="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>

        <!-- Right: Details -->
        <div class="col-md-6 p-5 d-flex flex-column justify-content-center">
          <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div v-else-if="show">
            <h2 class="fw-bold mb-3">{{ show.name }}</h2>
            <div class="mb-3 text-muted small d-flex flex-wrap gap-3">
              <div>⭐ {{ show.rating?.average || 'N/A' }}</div>
              <div>⏱️ {{ show.runtime }} mins</div>
              <div>📺 {{ show.language }}</div>
            </div>
            <div class="mb-3" v-html="show.summary"></div>

            <div v-if="show.genres?.length">
              <h5 class="fw-semibold">Genres</h5>
              <div class="d-flex flex-wrap gap-2 mt-2">
                <span
                  v-for="genre in show.genres"
                  :key="genre"
                  class="badge bg-primary-subtle text-primary-emphasis px-3 py-2 rounded-pill"
                >
                  {{ genre }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.object-fit-cover {
  object-fit: cover;
  height: 100%;
}

.bg-dark {
  background-color: #0b1c2c !important;
}

.bg-primary-subtle {
  background-color: #ebf5fb;
}

.text-primary-emphasis {
  color: #2c3e50;
}
</style>
