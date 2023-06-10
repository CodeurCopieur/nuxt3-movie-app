<script setup>
    const state = reactive({
      movie: 'movie',
      tv: 'tv'
  });
</script>

<template>
   <div class="home my-8 container max-w-screen-lg max-w-screen-xl mx-auto px-4 py-8 lg:max-w-7xl">
    
    <div class="recommended px-6 mb-12">
      <h2 class="text-white-600 mb-1" aria-label="Films populaires"><span class="border-b-4 border-blue-800 text-lg">Films populaires</span></h2>
      <MovieOrTvSlider :type="state.movie" theme="popular"/>
    </div>

    <div class="recommended px-6 mb-12">
      <h2 class="text-white-600 mb-1" aria-label="Séries populaires"><span class="border-b-4 border-blue-800 text-lg">Séries populaires</span></h2>
      <MovieOrTvSlider :type="state.tv" theme="popular"/>
    </div>

    <div class="recommended px-6 mb-12">
      <h2 class="text-white-600 mb-1" aria-label="Films les mieux notés"><span class="border-b-4 border-blue-800 text-lg">Films les mieux notés</span></h2>
      <MovieOrTvSlider :type="state.movie" theme="top_rated"/>
    </div>

    <div class="recommended px-6 mb-12">
      <h2 class="text-white-600 mb-1" aria-label="Séries les mieux notés"><span class="border-b-4 border-blue-800 text-lg">Séries les mieux notés</span></h2>
      <MovieOrTvSlider :type="state.tv" theme="top_rated"/>
    </div>
  </div>
</template>