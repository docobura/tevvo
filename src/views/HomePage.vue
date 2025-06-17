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
    <div class="home container-fluid bg-light min-vh-100">
      <header class="bg-primary text-white p-3 shadow-sm">
        <div class="container d-flex justify-content-between align-items-center">
          <h1 class="mb-0">TV Shows</h1>
          <button 
            @click="logout" 
            class="btn btn-outline-light"
          >
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </header>

      <main class="container py-4">
        <div class="controls mb-4 row g-3 align-items-center">
          <div class="col-md-8">
            <div class="input-group">
              <span class="input-group-text bg-white">
                <i class="bi bi-search text-primary"></i>
              </span>
              <input
                v-model="showsStore.searchQuery"
                placeholder="Search shows..."
                class="form-control form-control-lg border-primary"
              >
            </div>
          </div>
          <div class="col-md-4">
            <button 
              @click="showsStore.toggleViewMode"
              class="btn btn-outline-primary btn-lg w-100"
            >
              <i class="bi" :class="showsStore.viewMode === 'grid' ? 'bi-list-ul' : 'bi-grid'"></i>
              {{ showsStore.viewMode === 'grid' ? 'List View' : 'Grid View' }}
            </button>
          </div>
        </div>

        <div v-if="showsStore.loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Loading shows...</p>
        </div>
        
        <ShowGrid 
          v-else 
          :shows="showsStore.filteredShows" 
          :mode="showsStore.viewMode" 
        />
      </main>
    </div>
  </template>

  <style scoped>
  /* Custom blue theme */
  :root {
    --bs-primary: #3498db;
    --bs-primary-light: #ebf5fb;
  }

  .home {
    color: #2c3e50;
  }

  .bg-primary {
    background-color: var(--bs-primary) !important;
  }

  .btn-outline-primary {
    --bs-btn-color: var(--bs-primary);
    --bs-btn-border-color: var(--bs-primary);
    --bs-btn-hover-bg: var(--bs-primary);
    --bs-btn-hover-border-color: var(--bs-primary);
  }

  /* Eye-friendly adjustments */
  body {
    line-height: 1.6;
    color: #34495e;
  }

  .form-control:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 0.25rem rgba(52, 152, 219, 0.25);
  }

  /* Responsive tweaks */
  @media (max-width: 768px) {
    .controls .col-md-4 {
      margin-top: 1rem;
    }
  }
  </style>