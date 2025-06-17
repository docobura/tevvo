<script setup>
/* eslint-disable no-undef */
defineProps({
  shows: Array,
  mode: String
});
</script>

<template>
  <div :class="['show-container', mode]">
    <router-link 
      v-for="show in shows" 
      :key="show.id" 
      :to="`/show/${show.id}`"
      :class="['show-card', mode]"
    >
      <img 
        v-if="show.image?.medium" 
        :src="show.image.medium" 
        :alt="show.name"
      />
      <div class="show-info">
        <h3>{{ show.name }}</h3>
        <p>Runtime: {{ show.runtime }} mins</p>
        <p>Rating: {{ show.rating?.average || 'N/A' }}</p>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.show-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.show-container.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.show-container.list {
  flex-direction: column;
}

.show-card {
  border: 1px solid #ddd;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.show-card:hover {
  transform: scale(1.03);
}

.show-card.grid {
  padding: 1rem;
  text-align: center;
}

.show-card.list {
  display: flex;
  padding: 1rem;
  align-items: center;
}

.show-card.list img {
  width: 100px;
  margin-right: 1rem;
}

.show-info {
  flex-grow: 1;
}
</style>