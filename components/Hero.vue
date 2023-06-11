<script setup>
    const { movies, type } = defineProps(['movies', 'type']);
    const resMovies = ref(movies);

  const getGenres = await useMoviesApi().getGenres(`${type}`);
  const genres = getGenres.data.genres;
   
    const gallerySwiperParams = {
      spaceBetween: 10,
      slideToClickedSlide: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      autoplay: {
          delay: 8000,
          disableOnInteraction: false  
      },
      pagination:{ clickable: true, dynamicBullets: true },
    };

    const activeSlideIndex = ref(0);
    
  const getTitle = (arrayId) => {
    const filteredObjects = computed(() => genres.filter(obj => arrayId.includes(obj.id)));
    return filteredObjects.value
  };

    // Fonction pour générer une URL d'image optimisée en fonction de la taille et du format
  const generateOptimizedImageUrl = (path, size) => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const imageSize = {
      original: 'original',
      large: 'w1280',
      medium: 'w780',
      small: 'w300',
    };

    const optimizedPath = path ? path : '/w500null'; // Remplacer par un chemin d'image d'espace réservé

    return `${baseUrl}${imageSize[size]}${optimizedPath}`;
  };
</script>
<template>
    <div class="component-app__wrap-sliderHero relative">
        <swiper 
            ref="gallerySwiperParams" 
            grab-cursor lazy 
            :modules="[SwiperAutoplay, SwiperPagination]"
            :autoplay="gallerySwiperParams.autoplay"
            :preload-images="true"
            :loop="gallerySwiperParams.loop"
            :slide-to-clicked-slide="gallerySwiperParams.slideToClickedSlide"
            @slideChange="activeSlideIndex = $event.activeIndex" class="h-max w-full component-app__wrap-slider">
        <SwiperSlide v-for="(movie, i) in movies" :class="{ 'active-slide': i === activeSlideIndex }" :key="i" class="component-app__wrap-slideHero relative">
            <div class="absolute z-10 h-full slide-content">
                <div class="w-full md:min-w-3xl md:max-w-3xl  xl:pl-40 p-0 h-full flex items-center md:mr-auto md:ml-0 mx-auto">
                    <div class="px-8">
                        <h3 class="text-lg lg:text-4xl font-extrabold mb-3 lg:mb-5" :aria-label="movie.original_title">{{ movie.title || movie.name}}</h3>
                        
                        <ul class="flex flex-wrap mb-6">
                            <li 
                                v-for="(title, i) in getTitle(movie.genre_ids)" :key="i"
                                class="border-b-4 border-blue-800 px-1 py-0"
                                :class="{ 'mr-1' : i != getTitle(movie.genre_ids).length -1  }"> 
                                <NuxtLink 
                                    :to="{query: {type: type , name: title.name.toLowerCase()}, path:`/genres/${title.id}`}"
                                    class="text-sm lg:text-base"
                                    role="link">{{ title.name }}</NuxtLink>
                            </li>
                        </ul>
                        
                        <div class="precent-bar mb-6">
                            <span class="precent-per flex">
                                <span class="stars mr-3">
                                    <span v-for="star in 5" :key="star" 
                                        :class="useMoviesApi().getStarClass(star, movie.vote_average)"
                                        class="text-xl">{{ useMoviesApi().getStarSymbol(star, movie.vote_average) }}</span>
                                </span>
                            </span>
                        </div>

                        <p class="text-sm lg:text-base leading-normal mb-6" :aria-label="movie.overview.substring(0,200)+'...'">{{ movie.overview.substring(0,200)+".." }}</p>
                        <a 
                            :href="`${type}/${movie.id}`" class="inline-block py-1 px-6 border-b-4 border-blue-800"
                            aria-label="En savoir plus sur le film">
                            <span>PLUS</span>
                        </a>
                    </div>
                </div>
            </div>
                
            <div class="component-app__aspect-ratio"></div>
            <div class="component-app__linear-black"></div>
            <picture>
                <source :srcset="generateOptimizedImageUrl(movie.backdrop_path, 'original')" media="(min-width: 768px)">
                <source :srcset="generateOptimizedImageUrl(movie.backdrop_path, 'medium')" media="(min-width: 480px) and (max-width: 768px)">
                <source :srcset="generateOptimizedImageUrl(movie.poster_path, 'small')" media="(max-width: 480px)">
                <img 
                    class="swiper-lazy" 
                    :src="generateOptimizedImageUrl(movie.poster_path, 'small')"
                    :alt="movie.original_title"
                    loading="lazy">
            </picture>

        </SwiperSlide>
        </swiper>
    </div>
</template>

<style>

.slide-content {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.swiper-slide-active .slide-content {
  opacity: 1;
  transform: translateY(0);
}


.stars {
  color: #FFD700; /* Couleur des étoiles jaunes */
}

.star-empty {
  color: #CCC; /* Couleur de l'étoile sans couleur */
}
</style>