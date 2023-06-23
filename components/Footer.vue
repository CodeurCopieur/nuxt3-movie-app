<template>
 <footer class="bg-blue-800 footer">
    <div class="container max-w-screen-lg max-w-screen-xl lg:max-w-7xl mx-auto md:py-12 py-8 px-6">
      <h4 class="md:mb-4 mb-6">Empire Movies Nuxt</h4>
      <div class="flex md:mb-4 mb-6 text-sm">
        <span>Made With</span> <NuxtLink class="ml-2 border-b-2 border-white-800" to="https://v3.nuxtjs.org/" target="_blank" aria-label="Nuxt 3">Nuxt 3</NuxtLink>
      </div>
      <div class="flex flex-wrap md:mb-4 mb-6 text-sm">
        <span>Data provided by</span> 
        <NuxtLink class="pl-0 ml-2 border-b-2 border-white-800" to="https://www.themoviedb.org/" target="_blank" aria-label="Nuxt 3">The Movie Database</NuxtLink>
      </div>
      <nav class="flex justify-start md:mb-4 mb-6 text-sm">
        <ul class="flex flex-wrap flex-row gap-2.5 md:gap-4 ">
          <li class="pr-2"><NuxtLink class="border-b-2" to="/" aria-label="Accueil">Accueil</NuxtLink></li>
          <li class="pr-2"><NuxtLink class="border-b-2" to="/movie" aria-label="Films">Movie</NuxtLink></li>
          <li class="pr-2"><NuxtLink class="border-b-2" to="/tv" aria-label="Séries TV">Séries TV</NuxtLink></li>
          <li class="pr-2"><NuxtLink class="border-b-2" to="/search" aria-label="Recherche">Recherche</NuxtLink></li>
          <li><NuxtLink class="border-b-2" to="/genres" aria-label="Genres">Genres</NuxtLink></li>
        </ul>
      </nav>
      <nav class="flex justify-end text-sm">
        <ul class="flex flex-wrap flex-row gap-2.5 md:gap-4 ">
          <li>
            <NuxtLink class="border-b-2" to="https://twitter.com/CodeurCopieur" target="_blank"  aria-label="Twitter">Twitter</NuxtLink>
          </li>
          <li class="border-l-2 md:pl-4  pl-2">
            <NuxtLink class="border-b-2" to="https://github.com/CodeurCopieur" target="_blank"  aria-label="Github">Github</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>