<template>
  <div
    class="flex items-center border border-slate-200 p-4 rounded-xl gap-3 mt-5"
  >
    <img :src="props.imageUrl" alt="Sneaker" class="w-16 h-16" />
    <div class="flex justify-between flex-col">
      <p>{{ props.title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ props.price }} руб.</b>
        <img
          src="/close.svg"
          alt=""
          class="opacity-40 hover:opacity-100 transition cursor-pointer"
          @click="props.onClickRemove"
        />
      </div>
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
  onClickRemove: {
    type: Function,
  },
});
</script>
