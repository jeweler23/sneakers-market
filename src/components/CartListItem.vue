<template>
  <div class="flex flex-col flex-1" v-auto-animate>
    <CartItem
      v-for="(item, index) in cartItems"
      :key="index"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :onClickRemove="() => removeToCart(item)"
    />
  </div>
</template>

<script setup>
import { inject } from "vue";
import CartItem from "./CartItem.vue";

const { removeToCart, cartItems } = inject("cartActions");
</script>
