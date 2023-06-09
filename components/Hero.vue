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
            :slide-to-clicked-slide="gallerySwiperParams.slideToClickedSlide" class="h-max w-full component-app__wrap-slider">
        <SwiperSlide v-for="(movie, i) in movies" :key="i" class="component-app__wrap-slideHero relative">
            <div class="absolute z-10 h-full">
                <div class="w-full md:min-w-3xl md:max-w-3xl  xl:pl-40 p-0 h-full flex items-center md:mr-auto md:ml-0 mx-auto">
                    <div class="px-8">
                        <h3 class="text-lg lg:text-4xl font-extrabold mb-3 lg:mb-5" :aria-label="movie.original_title">{{ movie.original_title}}</h3>
                        
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
                            <span class="precent-per inline-block"
                                :class="useMoviesApi().getColor(`${movie.vote_average}`)" 
                                :style="{'width':useMoviesApi().percent(`${movie.vote_average}`)+'%'}"
                                :aria-label="`Pourcentage de vote : ${useMoviesApi().percent(`${movie.vote_average}`)}+%' `">
                                <span class="percent-tooltip inline-block" 
                                    :class="useMoviesApi().getColor(`${movie.vote_average}`)"
                                    :aria-label="`Pourcentage de vote : ${useMoviesApi().percent(`${movie.vote_average}`)}+%' `">{{ useMoviesApi().percent(`${movie.vote_average}`) }}</span>
                            </span>
                        </div>

                        <p class="text-sm lg:text-base leading-normal mb-6" :aria-label="movie.overview.substring(0,200)+'...'">{{ movie.overview.substring(0,200)+".." }}</p>
                        <a 
                            :href="`movie/${movie.id}`" class="inline-block py-1 px-6 border-b-4 border-blue-800"
                            aria-label="En savoir plus sur le film">
                            <span>PLUS</span>
                        </a>
                    </div>
                </div>
            </div>
                
            <div class="component-app__aspect-ratio"></div>
            <div class="component-app__linear-black"></div>
            <picture>
                <source :srcset="generateOptimizedImageUrl(movie.backdrop_path || movie.backdrop_path, 'original')" media="(min-width: 768px)">
                <source :srcset="generateOptimizedImageUrl(movie.backdrop_path || movie.backdrop_path, 'medium')" media="(max-width: 768px)">
                <img 
                    class="swiper-lazy" 
                    :alt="movie.original_title"
                    loading="lazy">
            </picture>

        </SwiperSlide>
        </swiper>
    </div>
</template>

<style>


.bg-gradient-cover {
	background-color: transparent;
    background-image: linear-gradient(transparent,rgba(0,0,0,0.92));
}
.max-h-98 {
    max-height: 24.3rem;
}
.box-one > article:nth-child(1) { 
	padding-top: 0;
	padding-bottom: 0.125rem;
	padding-right: 0.125rem;
}
.box-one > article:nth-child(2) {
	padding-top: 0;
	padding-bottom: 0.125rem;
	padding-left: 0.125rem;
}
.box-one > article:nth-child(3) {
	padding-top: 0.125rem;
	padding-bottom: 0.125rem;
	padding-right: 0.125rem;
}
.box-one > article:nth-child(4) {
	padding-top: 0.125rem;
	padding-bottom: 0.125rem;
	padding-left: 0.125rem;
}
.swiper-slide-visible.swiper-slide-active {
    opacity: 1;
}
.swiper-slide-visible {
    opacity: .5;
}
</style>