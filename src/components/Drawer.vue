<template>
  <div
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    @click="() => sneakersStore.toggleDraver"
  ></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col">
    <DrawerHead />
    <infoBlock
      title="Корзина пустая"
      image-url="/package-icon.png"
      description="добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
      v-if="!totalPriceCart"
    />
    <CartListItem />
    <div v-if="totalPriceCart">
      <div class="flex gap-2 mt-5">
        <span>Итого:</span>
        <div class="border-b border-dashed flex-1"></div>
        <b>{{ totalPriceCart }} руб.</b>
      </div>
      <div class="flex gap-2 mt-5">
        <span>Налог 5%:</span>
        <div class="border-b border-dashed flex-1"></div>
        <b>{{ totalPriceTax }} руб.</b>
      </div>
      <button
        :disabled="buttonDisabled"
        class="transition bg-lime-500 w-full rounded-xl py-3 mt-5 text-white hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400"
        @click="() => emit('createOrder')"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<script setup>
import DrawerHead from "./DrawerHead.vue";
import CartListItem from "./CartListItem.vue";
import infoBlock from "./infoBlock.vue";

import { computed } from "vue";
import { useSneakersStore } from "@/store";

const sneakersStore = useSneakersStore();

const props = defineProps({
  totalPriceCart: {
    type: Number,
  },
  totalPriceTax: {
    type: Number,
  },
  isCreatingOrder: {
    type: Boolean,
  },
});

const emit = defineEmits(["createOrder"]);

const buttonDisabled = computed(() =>
  props.isCreatingOrder ? true : props.totalPriceCart ? false : true
);
</script>
