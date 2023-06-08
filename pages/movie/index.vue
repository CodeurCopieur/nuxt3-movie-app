<script setup>
  useHead({
    title: 'Movie | Nuxt 3 and Themoviedb',
    meta: [
      {name: 'description', content: 'Cette page les films'}
    ]
  });
</script>

<template>
 <PageHeader title="Movie"></PageHeader>
 <section>
  <MovieOrTvCard :type="`movie`"/>
</section>
</template>

