import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router"; // ✅ import this

import routes from "~pages";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
