<script setup>
  const { type } = defineProps(['type']);
  const {id} = useRoute().params;
  const moviesApi = useMoviesApi();
  
  const data = await moviesApi.getDetails(`${type}`, `${id}`);

  const state = reactive({
    isOpen: false,
    infos: [],
    recommendations: [],
    personCreditsMovies: [],
    personCreditsTv: [],
    videos: []
  })
  

  if (type === 'movie' || type ==='tv') {
    state.infos = await useMoviesApi().credits(`${type}`, `${id}`)
    state.recommendations = await useMoviesApi().recommendations(`${type}`, `${id}`)
    state.videos = await  useMoviesApi().videos(`${type}`, `${id}`)
  } else if (type === 'person') {
    state.personCreditsMovies = await useMoviesApi().personCredits('movie', `${id}`)
    state.personCreditsTv = await useMoviesApi().personCredits('tv', `${id}`)
  }

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
  
  <Head>
    <Title>{{ data.title || data.original_name || data.name }} | {{ type === 'person' ? 'Acting' : type }} | Nuxt 3 and Themoviedb</Title>
    <Meta name="description" :content="data.overview || data.biography" />
  </Head>
  <section class="pb-10 sm:pb-16">
    <div class="postImage w-full rounded mb-10 relative">
      <div 
      class="postImage-bck relative overflow-hidden"
      :class="{'h-[350px] sm:h-[550px]': type === 'person'}">
        <div class="postImage__aspect-ratio"></div>
        <picture>
          <source :srcset="generateOptimizedImageUrl(data.backdrop_path || data.profile_path, 'large')" media="(min-width: 768px)">
          <source :srcset="generateOptimizedImageUrl(data.backdrop_path || data.profile_path, 'small')" media="(max-width: 768px)">
          <img 
            v-if="type === 'movie' || type ==='tv' || type === 'person'"
            loading="lazy"
            :alt="`${data.original_title || data.original_name || data.name}`" />

        </picture>
      </div>
      <div class="container max-w-7xl mx-auto postImage-pst mb-12">
        <div class="postImage-cover relative overflow-hidden">
          <div class="postImage-cover__aspect-ratio"></div>
            <picture>
              <source :srcset="generateOptimizedImageUrl(data.poster_path || data.profile_path, 'large')" media="(min-width: 768px)">
              <source :srcset="generateOptimizedImageUrl(data.poster_path || data.profile_path, 'small')"  media="(max-width: 768px)">
              <img 
                v-if="type === 'movie' || type ==='tv' || type === 'person'"
                :alt="`${data.original_title || data.original_name || data.name}`">

            </picture>
        </div>
        <div class="postImage-pst__info h-full px-4">
          <div>
            <h4 class="text-lg lg:text-4xl font-extrabold mb-3 lg:mb-5">{{ data.title || data.original_name || data.name }}</h4>
            <p class="text-xs mb-6" v-if="data.release_date || data.first_air_date"> {{ useMoviesApi().getDate(data.release_date || data.first_air_date) }}</p>

            <ul class="flex flex-wrap mb-6" v-if="type === 'movie' || type === 'tv'">
                <li 
                    v-for="(title, i) in data.genres" :key="i"
                    class="border-b-4 border-blue-800 px-1 py-0"
                    :class="{ 'mr-1' : i != data.genres.length -1  }"> 
                    <NuxtLink 
                        :to="{query: {type: type , name: title.name.toLowerCase().replace(/%/g, '')}, path:`/genres/${title.id}`}"
                        class="text-sm lg:text-base">{{ title.name }}</NuxtLink>
                </li>
            </ul>
            <ul v-else class="flex flex-wrap mb-6">
              <li class="border-b-4 border-blue-800 px-1 py-0 text-xs"> {{ data.known_for_department }}</li>
            </ul>

            <div class="precent-bar mb-6" v-if="type === 'movie' || type === 'tv'">
                <span class="precent-per flex">
                    <span class="stars mr-3">
                        <span v-for="star in 5" :key="star" 
                            :class="useMoviesApi().getStarClass(star, data.vote_average)"
                            class="text-xl">{{ useMoviesApi().getStarSymbol(star, data.vote_average) }}</span>
                    </span>
                </span>
            </div>
          <!-- Person -->
            <div class="text-sm text-base mb-6 flex items-center" v-if="type === 'person'">
              <div class="flex items-center pr-2" v-if="data.birthday">
                <dt>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </dt>
                <dd>
                  <span>{{ data.birthday }}</span> 
                </dd>
              </div>

              <div class="flex items-center pl-2"
                :class="{'border-l-2' : data.birthday}" v-if="data.place_of_birth">
                <dt>
                  <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
                    <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                    <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                  </svg>
                </dt>
                <dd>
                  <span>{{ data.place_of_birth }}</span>
                </dd>
              </div>
            </div>
            <p class="text-sm lg:text-base leading-normal mb-6">{{ data.overview || data.biography}}</p>

            <button 
              v-if="(type === 'movie' || type === 'tv') && (state.videos)"
              @click="state.isOpen = !state.isOpen" class="inline-block py-1 px-6 border-b-4 border-blue-800 mb-8 cursor-pointer mx-auto">
              <span>Regarder</span>
            </button>


            <teleport to="body">
              <aside id="modal1" class="modal fixed top-0 left-0 w-full h-full overflow-hidden" role="dialog" aria-labelledby="popinquizz" :aria-modal="state.isOpen" v-if="state.isOpen">
                <modal-content 
                  @close="state.isOpen = false"
                  :items="state.videos.results"
                  :type="type"
                   />
              </aside>
            </teleport>

            <div class="recommended mb-12" v-if="(type === 'movie' || type === 'tv') && state.infos.cast.length > 0">
              <h2 class="text-white-600 mb-1">
                <span class="border-b-4 border-blue-800 text-lg">Têtes d'affiche</span>
              </h2>
                <MovieOrTvSlider :type="`person`" :items="state.infos.cast"/> 
            </div>

          </div>
        </div>
      </div> 

      <div class="recommended container max-w-7xl mx-auto px-4 md:px-8">
        <div v-if="type === 'person' && state.personCreditsMovies && state.personCreditsMovies.cast.length > 0">
          <h2 class="text-white-600 mb-1">
            <span class="border-b-4 border-blue-800 text-lg">Films</span>
          </h2>
          <MovieOrTvSlider :type="'movie'" :items="state.personCreditsMovies.cast"/> 
        </div>
        <div v-if="type === 'person' && state.personCreditsTv && state.personCreditsTv.cast.length > 0">
          <h2 class="text-white-600 mb-1">
            <span class="border-b-4 border-blue-800 text-lg">Series</span>
          </h2>
          <MovieOrTvSlider :type="'tv'" :items="state.personCreditsTv.cast"/> 
        </div>
      </div>

      <div class="recommended container max-w-7xl mx-auto px-4 md:px-8" v-if="(type === 'movie' || type === 'tv') && state.recommendations.length > 0">
        <h2 class="text-white-600 mb-1">
          <span class="border-b-4 border-blue-800 text-lg">Tu pourrais aussi aimer</span>
        </h2>
          <MovieOrTvSlider :type="type" theme="recommendations" :items="state.recommendations"/> 
      </div>
    </div>
    <!-- Post Content -->
  </section>
</template> 