<script setup>
  useHead({
    title: 'Tv Shows | Nuxt 3 and Themoviedb',
    meta: [
      {name: 'description', content: 'Les series & émissions de télévision'}
    ]
  });

  
    const timeWindow = 'week'; // Remplacez 'week' par la fenêtre de temps souhaitée
  const state = {
    allTv: [],
    timeWindow: 'week'
  }
  state.allTv = await useMoviesApi().getMovies(`trending/tv/${state.timeWindow}`);
</script>

<template>
  <Hero :movies="state.allTv" type="movie" />
  <section>
      <MovieOrTvCard :type="`tv`"/>
  </section>
</template>

