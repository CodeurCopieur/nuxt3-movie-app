<script setup>
  useHead({
    title: 'Movies | Nuxt 3 and Themoviedb',
    meta: [
      {name: 'description', content: 'Les films tendance et classées par popularité'}
    ]
  });

    const timeWindow = 'week'; // Remplacez 'week' par la fenêtre de temps souhaitée
  const state = {
    allMovies: [],
    timeWindow: 'week'
  }
  state.allMovies = await useMoviesApi().getMovies(`trending/movie/${state.timeWindow}`);
</script>

<template>
  <Hero :movies="state.allMovies" type="movie" />
  <section>
    <MovieOrTvCard :type="`movie`"/>
  </section>
</template>

