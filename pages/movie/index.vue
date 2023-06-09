<script setup>
  useHead({
    title: 'Movies | Nuxt 3 and Themoviedb',
    meta: [
      {name: 'description', content: 'Les films'}
    ]
  });
</script>

<template>
 <PageHeader title="Movie"></PageHeader>
 <section>
  <MovieOrTvCard :type="`movie`"/>
</section>
</template>

