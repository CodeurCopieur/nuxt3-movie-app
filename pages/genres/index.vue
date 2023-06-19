<script setup>

  useHead({
    title: 'Movies ou Series by genres | Nuxt 3 and Themoviedb',
    meta: [
      {name: 'description', content: 'Les films ou Séries par genres'}
    ]
  });

const genresMovie = ref([]);
const genresTv = ref([]);
const selectedGenreId = ref({
  movie: null,
  tv: null
});

const showSliderMovie = ref(null);
const showSliderTv = ref(null);
const loadingContent = ref(false);

const state = ref({
  id: null,
  name: '',
})



onMounted(async () => {
  // Lancer le chargement initial
  loadGenres('movie', genresMovie);
  loadGenres('tv', genresTv);
});

const loadGenres = async (type, genres) => {
  const response = await useMoviesApi().getGenres(type);
  genres.value = response.data.genres;
};

const handleLinkClick = (genreId, genreName, type) => {
  // Réinitialiser les valeurs
  state.value.id = null,
  state.value.name = ''

  state.value.id = genreId, 
  state.value.name = genreName

  // selectedGenreId.value = false;
  loadingContent.value = true;

 // Mettre à jour avec les nouvelles valeurs
  selectedGenreId.value[type] = genreId;

    // Restaurer l'autre type de genre à null
  const otherType = type === 'movie' ? 'tv' : 'movie';
  selectedGenreId.value[otherType] = null;



  setTimeout(() => {
    loadingContent.value = false;

    if (type === 'tv') {
      showSliderMovie.value = null;
      showSliderTv.value = true;
    } else {
      showSliderTv.value = null;
      showSliderMovie.value = true;
    }
  }, 800)
};

</script>
<template>

    
<!-- <PageHeader title="Genre" type="Movie"></PageHeader> -->
  <section class="py-20 md:py-10 container max-w-7xl mx-auto">

    <div class="container max-w-screen-lg max-w-screen-xl mx-auto px-4 lg:max-w-7xl">
      <div class="mx-4 mb-4">
        <h1 class="text-4xl font-bold text-center">Movie - <svg class="inline-block" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" alt="Icône des films">
                <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
        </h1>
      </div>
      <ul class="flex flex-wrap mb-6">
        <template v-for="(genre, i) in genresMovie" :key="genre.id">
          <li 
            class="border-b-4 border-blue-800 px-1 py-0 cursor-pointer"
            :class="{ 'mr-1' : i != genresMovie.length -1, 'bg-blue-800' : genre.id === selectedGenreId.movie, 'bg-transparent': selectedGenreId.movie !== genre.id }"> 
            <NuxtLink class="text-sm lg:text-base" @click="handleLinkClick(genre.id, genre.name, 'movie')">
              <span class="relative text-white">#{{ genre.name }}</span>
            </NuxtLink>
          </li>
        </template>
      </ul>
      <div class="mx-4 mb-4">
        <h1 class="text-4xl font-bold text-center">Tv - <svg style="display: inline-block;" fill="currentColor" width="24" height="24" alt="Icône des séries TV">
                  <path d="M21 6h-8.586l2.293-2.293-1.414-1.414L10 5.586 6.707 2.293 5.293 3.707 7.586 6H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 3v2h-2V9h2zm-2 4h2v2h-2v-2zM4 8h11v10H4V8z"></path>
                </svg>
                </h1>
      </div>
      <ul class="flex flex-wrap mb-6">
        <template v-for="(genre, i) in genresTv" :key="genre.id">
          <li 
            class="border-b-4 border-blue-800 px-1 py-0 cursor-pointer"
            :class="{ 'mr-1' : i != genresTv.length -1, 'bg-blue-800' : genre.id === selectedGenreId.tv, 'bg-transparent': selectedGenreId.tv !== genre.id  }"> 
            <NuxtLink class="text-sm lg:text-base" @click="handleLinkClick(genre.id, genre.name, 'tv')">
              <span class="relative text-white">#{{ genre.name }}</span>
            </NuxtLink>
          </li>
        </template>
      </ul>
      <div v-if="loadingContent" class="flex justify-center flew-wrap items-center" style="height: 400px">
        <div class="loader"></div>
      </div>
      <div v-else-if="!loadingContent && showSliderMovie" :id="selectedGenreId.movie" class="genre-slider">
        <div class="mb-12">
           <div class="flex items-center justify-between">
            <h2 class="flex items-start text-white-600 mb-1 border-b-4 border-blue-800 inline-block" aria-label="Films populaires">
              <svg class="inline-block" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" alt="Icône des films">
                <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
              <span class="text-lg">#{{ state.name }}</span>
            </h2>
            <NuxtLink 
              class="border-b-4 border-blue-800" 
              :to="`/genres/${state.id}?type=movie&name=${state.name.replace(/[% ]/g, match => match === '%' ? '' : '+').toLowerCase()}`" >Voir +</NuxtLink>
          </div>
          <MovieOrTvSlider type="movie" theme="genre" :id="selectedGenreId.movie" :key="selectedGenreId.movie" />
        </div>
      </div>
      <div v-else-if="!loadingContent && showSliderTv" :id="selectedGenreId.tv" class="genre-slider">
        <div>
           <div class="flex items-center justify-between">
            <h2 class="flex items-start text-white-600 mb-1 border-b-4 border-blue-800 inline-block" aria-label="Films populaires">
                <svg fill="currentColor" width="24" height="24" alt="Icône des séries TV">
                  <path d="M21 6h-8.586l2.293-2.293-1.414-1.414L10 5.586 6.707 2.293 5.293 3.707 7.586 6H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 3v2h-2V9h2zm-2 4h2v2h-2v-2zM4 8h11v10H4V8z"></path>
                </svg>
              <span class="text-lg">#{{ state.name }}</span>
            </h2>
            <NuxtLink 
              class="border-b-4 border-blue-800" 
              :to="`/genres/${state.id}?type=tv&name=${state.name.replace(/[% ]/g, match => match === '%' ? '' : '+').toLowerCase()}`" >Voir +</NuxtLink>
          </div>
          <MovieOrTvSlider type="tv" theme="genre" :id="selectedGenreId.tv" :key="selectedGenreId.tv" />
        </div>
      </div>
    </div>
  </section>
</template>