<script setup>
import { useShowsStore } from '@/stores/shows';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import ShowGrid from '@/components/ShowGrid.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const showsStore = useShowsStore();
const { logout } = useAuthStore();

onMounted(() => showsStore.fetchShows());
</script>

<template>
  <div class="home min-vh-100 d-flex flex-column">
    
    <!-- Header (light background only here) -->
    <header class="bg-primary text-white py-3 shadow-sm">
      <div class="container d-flex justify-content-between align-items-center">
        <h1 class="h4 mb-0 fw-bold">📺 TV Shows</h1>
        <button @click="logout" class="btn btn-outline-light d-flex align-items-center gap-2">
          <i class="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </header>

    <!-- Content Area with dark background -->
    <div class="bg-dark-blue text-white flex-grow-1 py-4">
      <div class="container">
        <!-- Controls -->
        <div class="row gy-3 align-items-center mb-4">
          <div class="col-md-8">
            <div class="input-group input-group-lg">
              <span class="input-group-text bg-white border-primary">
                <i class="bi bi-search text-primary"></i>
              </span>
              <input
                v-model="showsStore.searchQuery"
                type="text"
                class="form-control border-primary"
                placeholder="Search shows..."
              />
            </div>
          </div>
          <div class="col-md-4">
            <button
              @click="showsStore.toggleViewMode"
              class="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
            >
              <i :class="['bi', showsStore.viewMode === 'grid' ? 'bi-list-ul' : 'bi-grid']"></i>
              {{ showsStore.viewMode === 'grid' ? 'List View' : 'Grid View' }}
            </button>
          </div>
        </div>

        <!-- Loading Spinner -->
        <div v-if="showsStore.loading" class="text-center py-5">
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-light">Loading shows...</p>
        </div>

        <!-- Show Grid -->
        <div v-else>
          <ShowGrid
            :shows="showsStore.filteredShows"
            :mode="showsStore.viewMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --bs-primary: #3498db;
}

/* Entire content background (not the header) */
.bg-dark-blue {
  background-color: #001f3f;
}

/* Style cards within ShowGrid if not already styled */
.bg-dark-blue .card {
  background-color: #002b5b;
  border: none;
}
.bg-dark-blue .card-title,
.bg-dark-blue .card-text {
  color: #ffffff;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(52, 152, 219, 0.25);
  border-color: var(--bs-primary);
}

.btn-outline-primary:hover {
  background-color: var(--bs-primary);
  color: #fff;
  border-color: var(--bs-primary);
}

/* Optional: ensure full height on smaller screens */
html, body {
  height: 100%;
}
</style>
