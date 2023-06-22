<script setup>
    const { type } = defineProps(['type']);
    const mainOffsetTRef = ref(null)
    const mainOffsetT = mainOffsetTRef.value;
    const page = ref(1);

    const movies = ref([]);
    const scrollingComponent = ref(null)
    const isLoading = ref(true) // Ajout de la variable isLoading pour afficher une icône de chargement
    movies.value = await useMoviesApi().getMovies(`discover/${type}`, 1);

    async function loadMorePosts () {
      // window.scrollTo({
      //   top: mainOffsetT,
      //   behavior: "smooth"
      // })

      page.value++
      const newMovies = await useMoviesApi().getMovies(`discover/${type}`, page.value)
      movies.value.push(...newMovies)
    };


    const scrollTriger = ()=> {
        const observer = new IntersectionObserver( (entries) => {
        entries.forEach( entry => {
          if(entry.intersectionRatio > 0 ) {
            setTimeout(()=> {
              loadMorePosts()
            },100)
          }
        });
      });
      observer.observe(scrollingComponent.value);
    };

      onMounted(()=> {
        scrollTriger()
      });
</script>

<template>

  <div 
    v-if="movies.length"
    class="container max-w-7xl max-w-2xl mx-auto px-6 py-8 lg:max-w-7xl grid grid-cols-2 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

    <MovieOrTvOrPersonCard :items="movies" :type="type" />
  </div>
  <div class="container max-w-xs mx-auto pagination" ref="scrollingComponent">
    <Loading/>
  </div>
</template>