import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

const enhancedRoutes = [
  ...routes,
  {
    path: "/:pathMatch(.*)*", // catch all unknown routes
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: enhancedRoutes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
