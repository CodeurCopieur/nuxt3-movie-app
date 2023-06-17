<script setup>
  useHead({
    title: 'Search movie or serie or actor | Nuxt 3 and Themoviedb',
    meta: [
      {name: 'description', content: 'Recherche de film, serie, acteur'}
    ]
  });
</script>

<template>
  <PageHeader title="Search"></PageHeader>
  <PageSearch></PageSearch>
</template>