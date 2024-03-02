<script setup>
import { computed, onMounted, provide, watch } from "vue";
import axios from "axios";
import { ref } from "vue";
import { useSneakersStore } from "@/store/index.js";
import Header from "../components/Header.vue";
import CardList from "../components/CardList.vue";
import Drawer from "../components/Drawer.vue";
import { storeToRefs } from "pinia";

import { RouterLink } from "vue-router";

const cartItems = ref([]);
const searchSneakers = ref(null);
const isCreatingOrder = ref(false);

const sneakersStore = useSneakersStore();
const { items, drawerOpen } = storeToRefs(sneakersStore);

const filter = (e) => {
  if (e.target.value == 1) {
    items.value = items.value.sort((a, b) => (a.title > b.title ? 1 : -1));
  } else if (e.target.value == 2) {
    items.value = items.value.sort((a, b) => a.price - b.price);
  } else if (e.target.value == 3) {
    items.value = items.value.sort((a, b) => b.price - a.price);
  }
};

const search = () => {
  items.value = items.value.filter((elem) =>
    elem.title.includes(searchSneakers.value)
  );
};

const removeToCart = (elem) => {
  cartItems.value.splice(cartItems.value.indexOf(elem), 1);
  elem.isAdded = false;
};

const addToCart = (elem) => {
  if (!elem.isAdded) {
    cartItems.value.push(elem);
    elem.isAdded = true;
  } else {
    removeToCart(elem);
  }
};

watch(cartItems, () => {
    localStorage.setItem('cartItem',JSON.stringify(cartItems.value))
}, { deep: true });

const totalDraw = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price, 0)
);

const totalTax = computed(() =>
  totalDraw.value ? Math.round(totalDraw.value * 0.05) : 0
);

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await axios.post(
      "https://f686c0634cb536c8.mokky.dev/orders",
      {
        items: cartItems.value,
        totalDraw: totalDraw.value,
      }
    );
    cartItems.value = [];
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    isCreatingOrder.value = true;
  }
};

watch(cartItems, () => {
  items.value = items.value.map((elem) => ({
    ...elem,
    isAdded: false,
  }));
});

// const totalDraw = ref(0);

// watch(
//   cartItems,
//   (newValue) => {
//     totalDraw.value = newValue.reduce((acc, item) => acc + item.price, 0);

//   },
//   { deep: true }
// );

// watch(
//   searchSneakers,
//   (newValue) => {
//     items.value = items.value.filter(elem=> elem.title.includes(newValue));
//   },
//   { deep: true }
// );

provide("addToFavorite", sneakersStore.addToFavorite);
provide("cartActions", {
  removeToCart,
  cartItems,
});

onMounted(async () => {
  await sneakersStore.fetchItems();
  await sneakersStore.fetchFavorites();
});
</script>

<template>
  <div v-auto-animate>
    <Drawer
      v-if="drawerOpen"
      :totalPriceCart="totalDraw"
      :totalPriceTax="totalTax"
      @createOrder="createOrder"
      :is-creating-order="isCreatingOrder"
    />
  </div>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10">
    <Header :totalPriceCart="totalDraw" />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
        <div class="flex gap-4">
          <select
            name=""
            id=""
            class="py-2 px-3 border rounded-md outline-none"
            @change="filter"
          >
            <option disabled>Выберите один из вариантов</option>
            <option value="1">По названию</option>
            <option value="2">По цене (дешевые)</option>
            <option value="3">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img
              src="/search.svg"
              alt=""
              class="absolute -translate-y-1/2 translate-x-1/2 top-1/2"
            />
            <input
              type="text"
              placeholder="Search"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
              v-model="searchSneakers"
              @input="search"
            />
          </div>
        </div>
      </div>

      <CardList :items="items" @addToCart="addToCart" />
    </div>
    <p class="text-gray-500">Jeweler 23</p>
  </div>
</template>

<style></style>
