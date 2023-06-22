<script setup>

  const router = useRouter();
  const {id} = useRoute().params;
  const {name, type} = useRoute().query;
  const page = ref(1);
  const movies = ref([]);
  const scrollingComponent = ref(null)

  // const mainOffsetTRef = ref(null)
  // const mainOffsetT = mainOffsetTRef.value
  movies.value = await useMoviesApi().getMoviesD(`discover/${type}`, page.value, `${id}`);

  async function loadMorePosts () {
    // window.scrollTo({
    //   top: mainOffsetT,
    //   behavior: "smooth"
    // })
  
    page.value++
    const newMovies = await useMoviesApi().getMoviesD(`discover/${type}`, page.value, `${id}`)
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
<template ref="mainOffsetTRef">

  <div 
    v-if="movies.length"
    class="container max-w-5xl mx-auto px-6 py-8 lg:max-w-7xl grid grid-cols-2 gap-y-10 gap-x-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">

    <MovieOrTvOrPersonCard :items="movies" :type="type"></MovieOrTvOrPersonCard>
  </div>

  <div class="container max-w-xs mx-auto pagination" ref="scrollingComponent">
    <Loading/>
  </div>
</template>