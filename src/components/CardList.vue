<template>
  <div class="grid grid-cols-4 gap-5 mt-10" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :id="item.id"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      :on-click-favorite="() => sneakersStore.addToFavorite(item)"
      :onClickAdd="() => emit('addToCart', item)"
    />
  </div>
</template>

<script setup>
import Card from "./Card.vue";
import { useSneakersStore } from "@/store";

const sneakersStore = useSneakersStore();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["addToCart"]);
</script>
