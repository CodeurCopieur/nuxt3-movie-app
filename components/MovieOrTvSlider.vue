<script setup>
  const { type, theme, items } = defineProps(['type', 'theme', 'items']);
  const state = reactive({
    res: [],
  isVideosLoaded: false,
  loadedVideos: [],
  error: '', // Variable pour stocker l'erreur
  })

  if (type === 'movie' && theme === 'popular' || type === 'movie' && theme === 'top_rated'  || type === 'tv' && theme === 'popular' || type === 'tv' && theme === 'top_rated') {
    state.res = await useMoviesApi().getMovies(`${type}/${theme}`, 1);
  } else if(type === 'movie' && theme === 'recommendations' || type === 'tv' && theme === 'recommendations') {
    state.res = items
  } else {
    state.res = items
  }

const loadVideos = () => {
  if (type === 'videos') {
    const filter = items.filter((item) => {
      if (item.site === 'YouTube' && item.type === 'Trailer') {
        return item;
      }
    });
    if (filter.length > 0) {
        state.res = filter;
        state.isVideosLoaded = true;

        filter.forEach((video) => {
          state.loadedVideos.push(video.key);
        });
      } else {
        // Gestion de l'erreur : Aucune vidéo trouvée
        state.error = 'Aucune vidéo trouvée.';
      }
  }
};

loadVideos(); // Appelez la fonction de chargement des vidéos lors de l'initialisation du composant


  const thumbnailSwiperParams = {
      spaceBetween: 10,
      loop: false,                         
      autoplay: {                         
          delay: 8000,
          disableOnInteraction: false  
      },
      touchRatio: 0.2,
      slidesPerView: 5,
      pagination:{ clickable: true, dynamicBullets: true },
      breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          480: {
              slidesPerView: 3,
              spaceBetween: 24,
              resistanceRatio: 0.85
          },
          768: {
              slidesPerView: 3,
              spaceBetween: 28,
              resistanceRatio: 0.85
          },
          980: {
              slidesPerView: 4,
              spaceBetween: 28,
              resistanceRatio: 0.85
          },
          1280: {
              slidesPerView: 5,
              spaceBetween: 32,
              resistanceRatio : 0
          }
      }
  };

  const thumbnailSwiperParams2 ={
    loop: false,
    slidesPerView: 1,
    spaceBetween: 10,
    resistanceRatio : 0,
    pagination:{ clickable: true, dynamicBullets: true }
  };
</script>

<template>
  <template  v-if="type === 'movie' && state.res || type === 'tv' && state.res || type === 'person' && state.res ">

  <swiper 
    class="swiperList"
    ref="thumbnailSwiperParams"
    :modules="[SwiperAutoplay, SwiperPagination]"
    grab-cursor lazy 
    :autoplay="thumbnailSwiperParams.autoplay"
    :preload-images="true"
    :loop="thumbnailSwiperParams.loop"
    :breakpoints="thumbnailSwiperParams.breakpoints"
    :pagination="thumbnailSwiperParams.pagination"
    role="list">
    <SwiperSlide v-for="(item, i) in state.res" :key="i" 
      class="h-full shadow-xl mr-0 sm:mr-4 border border-gray-700 hover:bg-gray-900 shadow-custom"
      :class="{'overflow-hidden': type === 'movie' || type === 'tv' }"
      role="listitem">
      <NuxtLink 
        :to="type === 'movie' || type === 'tv' || type === 'person' ? { path:`/${type}/${item.id}`} : {}" 
        class="relative"
        role="link">
        <div class="relative" style="padding-top: 130%;">
          <picture>
            <img 
              class="absolute inset-0 object-cover w-full h-full"
              :src="`https://image.tmdb.org/t/p/w300${item.poster_path || item.profile_path}`" 
              :alt="`${item.original_title || item.original_name || item.name}`"
              loading="lazy"
              role="img">
          </picture>

          <div class="precent-bar" v-if="type === 'movie' || type === 'tv'">
              <span class="precent-per flex justify-center">
                  <span class="stars mr-3">
                      <span v-for="star in 5" :key="star" 
                          :class="useMoviesApi().getStarClass(star, item.vote_average)"
                          class="text-base">{{ useMoviesApi().getStarSymbol(star, item.vote_average) }}</span>
                  </span>
              </span>
          </div>

        </div>
        <span class="text-center block">
          <span class="text-white text-xs">{{ item.original_name || item.original_title }}</span>
        </span>
      </NuxtLink>
    </SwiperSlide>
  </swiper>
  
  </template>


  <template v-else-if="type === 'videos' && state.res">
    <swiper 
      class="swiperList"
      ref="thumbnailSwiperParams2"
      :modules="[SwiperPagination]"
      :pagination="thumbnailSwiperParams2.pagination"
      role="list">
      <SwiperSlide 
        v-for="(item, i) in state.res" :key="i" 
        class="shadow-xl shadow-custom"
        :class="{'overflow-hidden': type === 'videos' }"
        role="listitem">
          <div class="videos-trailer">
            <iframe class="iframe-cont" 
              width="560" 
              height="315" 
              :src="`https://www.youtube.com/embed/${item.key}`" 
              :title="`${item.name}`" frameborder="0"
              role="presentation" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      </SwiperSlide>
    </swiper>
  </template>

  <!-- Afficher l'erreur si elle existe -->
  <div v-if="state.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 relative mt-4  text-center" role="alert">
    <strong class="font-bold">Erreur : </strong>
    <span class="block sm:inline">{{ state.error }}</span>
  </div>
</template>