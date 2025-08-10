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
  if (
    to.path === "/liquidity-pair" &&
    import.meta.env.VITE_IS_ADMIN !== "true"
  ) {
    return next("/");
  }
  next();
});

export default router;
