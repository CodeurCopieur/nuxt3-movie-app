<script setup>
  const getGenres = await useMoviesApi().getGenres(`movie`);
  const getGenresTv = await useMoviesApi().getGenres(`tv`);
  const genresMovie = getGenres.data.genres;
  const genresTv = getGenresTv.data.genres;


</script>
<template>
  <div>
    <PageHeader title="Genre" type="Movie"></PageHeader>

    <section class="my-8 container max-w-screen-lg max-w-screen-xl mx-auto px-4 py-8 lg:max-w-7xl">
      <div class="px-6 mb-12" v-for="genre in genresMovie" :key="genre.id">
        <div class="flex items-center justify-between">
          <h2 class="flex items-start text-white-600 mb-1 border-b-4 border-blue-800 inline-block" aria-label="Films populaires">
            <svg class="inline-block" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" alt="Icône des films">
              <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
            <span class="text-lg">#{{ genre.name }}</span>
          </h2>
          <NuxtLink 
            class="border-b-4 border-blue-800" 
            :to="`/genres/${genre.id}?type=movie&name=${genre.name.replace(/[% ]/g, match => match === '%' ? '' : '+').toLowerCase()}`" >Voir +</NuxtLink>
        </div>

        <div :id="genre.id">
          <MovieOrTvSlider type="movie" theme="genre" :id="genre.id"/>
        </div>
        
      </div>
    </section>

    <PageHeader title="Genre" type="TV"></PageHeader>

    <section class="py-10 container max-w-7xl mx-auto">
      <div class="flex flex-wrap gap-5">
        <NuxtLink 
        class="before:block before:absolute before:-inset-1 before:-skew-x-2 before:bg-blue-800 relative inline-block block py-2 px-4 bg-gray-300 hover:bg-gray-400"
          v-for="genre in genresTv"
          :key="genre.id"
          :to="`/genres/${genre.id}?type=tv&name=${genre.name.replace(/[% ]/g, match => match === '%' ? '' : '+').toLowerCase()}`"
          >
          <span class="relative text-white">#{{ genre.name }}</span>
          </NuxtLink>
      </div>
    </section>
  </div>
</template>