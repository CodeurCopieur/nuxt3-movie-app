<script setup>
  useHead({
    title: 'Tv Shows | Nuxt 3 and Themoviedb',
    meta: [
      {name: 'description', content: 'Cette page les series & émissions de télévision'}
    ]
  });
</script>

<template>
 <PageHeader title="TV"></PageHeader>
 <section>
      <MovieOrTvCard :type="`tv`"/>
    </section>
</template>

