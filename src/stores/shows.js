import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useShowsStore = defineStore('shows', () => {
  const shows = ref([]);
  const loading = ref(false);
  const searchQuery = ref('');
  const viewMode = ref('grid'); // 'grid' or 'list'

  const filteredShows = computed(() => {
    return shows.value.filter(show => 
      show.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const fetchShows = async () => {
    loading.value = true;
    try {
      const requests = Array.from({ length: 13 }, (_, i) => 
        axios.get(`https://api.tvmaze.com/shows/${i + 1}`)
      );
      const responses = await Promise.all(requests);
      shows.value = responses.map(res => res.data);
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
      loading.value = false;
    }
  };

  return { 
    shows, 
    loading, 
    fetchShows, 
    searchQuery, 
    filteredShows,
    viewMode,
    toggleViewMode: () => viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
  };
}); 