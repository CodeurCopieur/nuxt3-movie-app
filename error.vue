<script setup>
  defineProps(['error']);

  const handleClearError = () => clearError({ redirect: '/'});
</script>

<template>
  <NuxtLayout name="default">
    <div class="container max-w-7xl max-w-2xl mx-auto px-4 py-8 lg:max-w-7xl flex flex-col justify-center content-center min-h-screen">
<div class="text-center">
        <p class="mt-7 text-7xl font-bold">
        {{ error.statusCode }}
      </p>
      <p class="mt-7 text-6xl">Ooops.</p>
      <p class="mt-7">{{ error.message }}</p>
      <button class="btn my-7 p-4 rounded  bg-blue-800" @click="handleClearError">Go Accueil...</button>
</div>
    </div>
  </NuxtLayout>
</template>