import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Favorites from "./pages/Favorites.vue";

import App from "./App.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(createPinia());
app.use(autoAnimatePlugin);
app.use(router);

app.mount("#app");
