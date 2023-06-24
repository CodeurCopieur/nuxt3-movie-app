<script setup>
  const { items, type } = defineProps(['items', 'type']);
  defineEmits(['close']);
</script>

<template>
  <div class="modal-wrapper relative w-screen h-screen  flex justify-center items-center">
    <div class="container_story relative w-full md:w-2/3 md:h-4/5">
      <button 
        class="block mx-auto md:mr-0 md:ml-auto text-center text-white bg-blue-800 text-teal-900 hover:bg-blue-500"
        @click.self.stop="$emit('close')">
          <svg fill="white" style="pointer-events: none;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" alt="Icône de fermeture">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
        </button>

      <MovieOrTvSlider 
        type="videos" 
        :items="items" /> 
    </div>
  </div>
</template>