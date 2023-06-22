<template>
 <footer class="shadow-sm bg-gray-900">
      <nav class="container max-w-7xl max-w-2xl mx-auto lg:max-w-7xl mx-auto p-4 flex justify-center md:justify-start">
        <ul class="flex flex-col md:flex-row gap-2.5 md:gap-4 ">
          <li class="border-b-4 border-blue-800"><NuxtLink to="/" aria-label="Accueil">Accueil</NuxtLink></li>
          <li class="border-b-4 border-blue-800"><NuxtLink to="/movie" aria-label="Films">Movie</NuxtLink></li>
          <li class="border-b-4 border-blue-800"><NuxtLink to="/tv" aria-label="Séries TV">Séries TV</NuxtLink></li>
          <li class="border-b-4 border-blue-800"><NuxtLink to="/search" aria-label="Recherche">Recherche</NuxtLink></li>
          <li class="border-b-4 border-blue-800"><NuxtLink to="/genres" aria-label="Genres">Genres</NuxtLink></li>
        </ul>
      </nav>
    </footer>
</template>