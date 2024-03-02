<template>
  <div
    class="relative border bg-white border-slate-100 rounded-2xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt=""
      class="absolute top-8 left-8"
      @click="onClickFavorite"
    />
    <img :src="props.imageUrl" alt="Sneaker" />
    <p class="mt-2">{{ props.title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ props.price }} руб.</b>
      </div>
      <img
        @click="props.onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  id: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
});
</script>
