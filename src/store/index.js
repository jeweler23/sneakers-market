import { defineStore } from "pinia";
import axios from "axios";

export const useSneakersStore = defineStore("sneakersStore", {
  state: () => ({
    items: [],
    drawerOpen:false,
  }),
  actions: {
    async fetchItems() {
      try {
        const { data } = await axios.get(
          "https://f686c0634cb536c8.mokky.dev/items"
        );
        this.items = data.map((obj) => ({
          ...obj,
          isFavorite: false,
          isAdded: false,
        }));
      } catch (e) {
        console.log(e);
      }
    },
    async fetchFavorites() {
      try {
        const { data: favorites } = await axios.get(
          "https://f686c0634cb536c8.mokky.dev/favorites"
        );
        this.items = this.items.map((item) => {
          const favorite = favorites.find(
            (favorite) => favorite.parentId === item.id
          );

          if (!favorite) {
            return item;
          }

          return {
            ...item,
            isFavorite: true,
            favoriteId: favorite.id,
          };
        });
      } catch (e) {
        console.log(e);
      }
    },
    async addToFavorite(item) {
      
      try {
        if (!item.isFavorite) {
          const obj = {
            parentId: item.id,
          };
          item.isFavorite = true;
          const { data } = await axios.post(
            "https://f686c0634cb536c8.mokky.dev/favorites",
            obj
          );

          item.favoriteId = data.id;
        } else {
          item.isFavorite = false;

          await axios.delete(
            `https://f686c0634cb536c8.mokky.dev/favorites/${item.favoriteId}`
          );
          item.favoriteId = null;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters:{
    toggleDraver(state){
      return state.drawerOpen = !state.drawerOpen
    }
  }
});
