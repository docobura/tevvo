<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const show = ref(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${route.params.id}`
    );
    show.value = response.data;
  } catch (error) {
    console.error("Failed to fetch show details:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="details">
    <router-link to="/" class="back-link">← Back to Shows</router-link>
    
    <div v-if="loading">Loading show details...</div>
    <div v-else-if="show" class="show-content">
      <div class="show-header">
        <h1>{{ show.name }}</h1>
        <div class="metadata">
          <span>⭐ {{ show.rating?.average || 'N/A' }}</span>
          <span>⏱️ {{ show.runtime }} mins</span>
          <span>📺 {{ show.language }}</span>
        </div>
      </div>

      <div class="show-body">
        <img 
          v-if="show.image?.original" 
          :src="show.image.original" 
          :alt="show.name"
          class="featured-image"
        >
        <div v-html="show.summary"></div>
      </div>

      <div v-if="show.genres?.length" class="genres">
        <h3>Genres</h3>
        <div class="genre-tags">
          <span v-for="genre in show.genres" :key="genre" class="tag">
            {{ genre }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #42b983;
}

.show-header {
  margin-bottom: 2rem;
}

.metadata {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  color: #666;
}

.featured-image {
  max-width: 100%;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.genres {
  margin-top: 2rem;
}

.genre-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #eee;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>