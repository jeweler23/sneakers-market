<script setup>
const props = defineProps({
  imageUrl: String,
  title: String,
  description: String,
});
</script>

<template>
  <div class="flex flex-col item-center text-center mx-auto w-278px">
    <img :src="imageUrl" alt="" class="w-36 mx-auto" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400 mt-2">{{ description }}</p>
  </div>
</template>

<style scoped></style>
