<script setup>
import { RouterLink } from "vue-router";
import { useSneakersStore } from "@/store";

const sneakersStore = useSneakersStore();

const props = defineProps({
  totalPriceCart: {
    type: Number,
  },
});
</script>

<template>
  <header
    class="flex justify-between items-center border-b border-slate-300 px-10 py-8"
  >
    <router-link to="/">
      <div class="flex gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex gap-10">
      <li
        class="flex items-center gap-3 text-slate-500 hover:text-black cursor-pointer"
        @click="()=>sneakersStore.toggleDraver"
      >
        <img src="/cart.svg" alt="cart" />
        <span>{{ totalPriceCart }} ₽</span>
      </li>
      <router-link to="/favorites">
        <li
          class="flex items-center gap-3 text-slate-500 hover:text-black cursor-pointer"
        >
          <img src="/heart.svg" alt="cart" />
          <span>Закладки</span>
        </li>
      </router-link>
      <li
        class="flex items-center gap-3 text-slate-500 hover:text-black cursor-pointer"
      >
        <img src="/profile.svg" alt="cart" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>

<style></style>
